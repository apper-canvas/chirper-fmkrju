import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: localStorage.getItem('language') || 'English (US)',
  fontSize: localStorage.getItem('fontSize') || 'medium',
  isLoading: false,
  error: null,
  reducedAnimations: localStorage.getItem('reducedAnimations') === 'true' || false
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
      state.isLoading = action.payload;
    },
    toggleReducedAnimations: (state) => {
      state.reducedAnimations = !state.reducedAnimations;
      localStorage.setItem('reducedAnimations', state.reducedAnimations);
    },
    setSettingsError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setLanguage, setSettingsLoading, setSettingsError, toggleReducedAnimations } = settingsSlice.actions;
export default settingsSlice.reducer;