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
      
      // Always persist language preference to localStorage
      if (action.payload) {
        localStorage.setItem('language', action.payload);
        
        // Update document language immediately
        const languageMap = { 'English (US)': 'en', 'Spanish': 'es', 'French': 'fr', 'German': 'de' };
        document.documentElement.lang = languageMap[action.payload] || 'en';
      }
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