import { configureStore } from '@reduxjs/toolkit';
import dashboard from './slices/dashboard';
import switcher from './slices/switcher';
import prodCertificates from './slices/prodCertificates';
import apiReferences from './slices/apiReferences';

export const makeStore = () => {
  return configureStore({
    reducer: {
      dashboard,
      switcher,
      prodCertificates,
      apiReferences,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
