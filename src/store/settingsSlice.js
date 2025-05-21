import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: localStorage.getItem('language') || 'English (US)',
  fontSize: localStorage.getItem('fontSize') || 'medium',
  error: null,
  reducedAnimations: localStorage.getItem('reducedAnimations') === 'true' || false
  error: null
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      if (action.payload) {
        // Persist language preference to localStorage
        localStorage.setItem('language', action.payload);
      }
    },
    setSettingsLoading: (state, action) => {
    },
    toggleReducedAnimations: (state) => {
      state.reducedAnimations = !state.reducedAnimations;
      localStorage.setItem('reducedAnimations', state.reducedAnimations);
      state.isLoading = action.payload;
    },
    setSettingsError: (state, action) => {
      state.error = action.payload;
    }
  }
});
  setSettingsError,
  toggleReducedAnimations
export const { setLanguage, setSettingsLoading, setSettingsError } = settingsSlice.actions;
export default settingsSlice.reducer;