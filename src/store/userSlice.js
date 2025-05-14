import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // CRITICAL: Always use deep cloning to avoid reference issues
      state.user = JSON.parse(JSON.stringify(action.payload));
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;