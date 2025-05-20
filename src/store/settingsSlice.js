import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: localStorage.getItem('language') || 'English (US)',
  fontSize: localStorage.getItem('fontSize') || 'medium',
  isLoading: false,
  error: null
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
    setSettingsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSettingsError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setLanguage, setSettingsLoading, setSettingsError } = settingsSlice.actions;
export default settingsSlice.reducer;