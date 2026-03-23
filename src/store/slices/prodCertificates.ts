import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

type ProdCrtSubStep = {
  label: string;
  active?: boolean;
  checked?: boolean;
};

type ProdCrtStep = {
  isActiveStep: boolean;
  title: string;
  sub?: ProdCrtSubStep[];
};

type CertificatesInitialState = {
  list: ProdCrtStep[];
  activeModal?: Record<string, unknown>;
};

const DEFAULT_STEPS: ProdCrtStep[] = [
  {
    isActiveStep: true,
    title: 'Business Information',
    sub: [
      { label: 'Business Details', active: true, checked: false },
      { label: 'Business Representative', active: false },
      { label: 'Ownership Details' },
      { label: 'Products and services' },
    ],
  },
  {
    isActiveStep: false,
    title: 'Bank Details',
    sub: [
      { label: 'Add Bank Account', active: true }
    ]
  },
  { isActiveStep: false, title: 'Select Products' },
  { isActiveStep: false, title: 'Review and Submit' },
];


const STATE_KEY = 'prod_certificates';
const initialState = {
  list: DEFAULT_STEPS,
};

const prodCertificatesSlice = createSlice({
  name: STATE_KEY,
  initialState: initialState as CertificatesInitialState,
  reducers: {

    setActiveModalDetails: (state, { payload }: PayloadAction<any>) => {
      return { ...state, activeModal: payload };
    },
    // Set the step with the given title as active and mark all others inactive
    setActiveStepByTitle: (state, { payload }: PayloadAction<string>) => {
      const title = payload;
      const list = state.list || [];
      for (let i = 0; i < list.length; i++) {
        const item: any = list[i];
        if (!item) continue;
        item.isActiveStep = item.title === title;
      }
    },
    // Advance the active sub-item for a given step title:
    // - find step by title
    // - find the sub item with `active: true`
    // - set that sub item's `checked = true` and `active = false`
    // - set the next sub item (index + 1) `active = true` if it exists
    advanceSubStep: (state, { payload }: PayloadAction<string>) => {
      const title = payload;
      const list = state.list || [];
      const step = list.find((s: any) => s.title === title);
      if (!step || !Array.isArray(step.sub)) return;

      const activeIndex = step.sub.findIndex((si: any) => si.active);
      if (activeIndex === -1) return;

      // mark current sub as checked and deactivate it
      step.sub[activeIndex].checked = true;
      step.sub[activeIndex].active = false;

      // activate the next sub element if present
      if (activeIndex + 1 < step.sub.length) {
        step.sub[activeIndex + 1].active = true;
      }
    },
  },
});

//Actions
export const prodCertificatesActions = prodCertificatesSlice.actions;

//Selectors
export const prodCertificatesList = (state: RootState) => state.prodCertificates.list;

// Returns the title of the last step (highest index) where `isActiveStep === true`, or undefined
export const prodCertificatesActiveStep = (state: RootState): string | undefined => {
  const list = state.prodCertificates.list || [];
  for (let i = list.length - 1; i >= 0; i--) {
    if (list[i]?.isActiveStep) return list[i].title;
  }
  return undefined;
};

// Returns the `label` of the active sub-item for the step where `isActiveStep === true`, or undefined
export const prodCertificatesActiveSubLabel = (state: RootState): string | undefined => {
  const list = state.prodCertificates.list || [];
  const activeStep = list.find((s: any) => s.isActiveStep);
  if (!activeStep || !Array.isArray(activeStep.sub)) return undefined;
  const activeSub = activeStep.sub.find((si: any) => si.active);
  return activeSub?.label;
};

//Reducers
export default prodCertificatesSlice.reducer;
