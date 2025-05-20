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

      if (action.payload) {
        // Persist language preference to localStorage
        localStorage.setItem('language', action.payload);
        
        // Map full language names to ISO language codes
        const languageMap = { 'English (US)': 'en', 'Spanish': 'es', 'French': 'fr', 'German': 'de' };
        document.documentElement.lang = languageMap[action.payload] || 'en';
        
        // Update title based on selected language
        const titles = {
          'English (US)': 'Chirper - Share your thoughts',
          'Spanish': 'Chirper - Comparte tus pensamientos',
          'French': 'Chirper - Partagez vos pensées',
          'German': 'Chirper - Teilen Sie Ihre Gedanken'
        };
        document.title = titles[action.payload] || titles['English (US)'];
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