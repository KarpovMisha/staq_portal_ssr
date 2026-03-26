import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

type ApiVersion = {
  version: number;
  urlSpecification: string;
};

type ApiChild = {
  name: string;
  description: string;
  path: string;
  hash?: string;
  defaultVersion: number;
  versions: ApiVersion[];
};

type ApiReferenceState = {
  currentApi: ApiChild | null;
  selectedVersion: number | null;
};

const initialState: ApiReferenceState = {
  currentApi: null,
  selectedVersion: null,
};

const apiReferenceSlice = createSlice({
  name: 'apiReference',
  initialState,
  reducers: {
    setCurrentApi(state, action: PayloadAction<ApiChild | null>) {
      state.currentApi = action.payload;
      if (action.payload) {
        // const versionExists = action.payload.versions.some(
        //   (item) => item.version === state.selectedVersion
        // );

        // if (!versionExists) {
        // }
          state.selectedVersion = action.payload.defaultVersion;
      } else {
        state.selectedVersion = null;
      }
    },

    setSelectedVersion(state, action: PayloadAction<number>) {
      state.selectedVersion = action.payload;
    },

    resetApiReferenceState(state) {
      state.currentApi = null;
      state.selectedVersion = null;
    },
  },
});

export const apiReferencesActions = apiReferenceSlice.actions;

//Getters
const selectCurrentApi = (state: RootState) => state.apiReferences.currentApi;
const selectSelectedVersion = (state: RootState) => state.apiReferences.selectedVersion;

//Selectors
export const selectCurrentUrlSpecification = createSelector(
  [selectCurrentApi, selectSelectedVersion],
  (currentApi, selectedVersion) => {
    if (!currentApi) return null;

    const versionToUse = selectedVersion ?? currentApi.defaultVersion;

    return (
      currentApi.versions.find(
        (item) => item.version === versionToUse
      )?.urlSpecification ?? null
    );
  }
);

export default apiReferenceSlice.reducer;
