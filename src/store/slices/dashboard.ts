import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type DashboardState = {
  activeModal: Record<string, any>;
  companyDetails: {
    name: string;
    email: string;
  };
};

export type DashboardModalPayload = Record<string, any>;

const STATE_KEY = 'dashboard';
const initialState = {
  activeModal: {
    name: 'dashboard setup',
  },
  companyDetails: {
    name: '',
    email: '',
  },
};

const dashboard = createSlice({
  name: STATE_KEY,
  initialState: initialState as DashboardState,
  reducers: {
    setActiveModalDetails: (state, { payload }: PayloadAction<DashboardModalPayload>) => {
      state.activeModal = payload;
    },
  },
});

//Actions
export const dashboardActions = dashboard.actions;

//Selectors
export const modalState = (state: RootState) => state.dashboard.activeModal;

//Reducers
export default dashboard.reducer;
