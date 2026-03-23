"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

interface SwitcherState {
  isSwitcherOpen: boolean;
}

const getInitialTheme = (): boolean => {
  if (typeof window === "undefined") return false;

  return localStorage.getItem("isDarkTheme") === "true";
};

const initialState: SwitcherState = {
  isSwitcherOpen: getInitialTheme(),
};

const switcherSlice = createSlice({
  name: "switcher",
  initialState,
  reducers: {
    setSwitcher(state, action: PayloadAction<boolean>) {
      state.isSwitcherOpen = action.payload;
    },
  },
});

//Actions
export const switcherActions = switcherSlice.actions;

//Selectors
export const selectIsDarkMode = (state: any) => !!state.switcher.isSwitcherOpen;

//Reducer
export default switcherSlice.reducer;

//Thunk
export const toggleTheme =
  (value: boolean) =>
  (dispatch: AppDispatch): void => {
    if (typeof window !== "undefined") {
      // localStorage
      localStorage.setItem("isDarkTheme", String(value));

      const parts = window.location.hostname.split(".");
      const domain = parts.length >= 2 ? parts.slice(-2).join(".") : parts[0];

      document.cookie = `isDarkTheme=${value}; path=/; domain=${domain}`;
      document.documentElement.classList.toggle("dark-theme", value);
    }

    dispatch(switcherActions.setSwitcher(value));
  };
