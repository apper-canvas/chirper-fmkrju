 import { configureStore } from '@reduxjs/toolkit';
import followReducer from '../redux/features/followSlice';
import userReducer from './userSlice';
import chirpsReducer from './chirpsSlice';
import userProfilesReducer from './userProfilesSlice';
import savedItemsReducer from './savedItemsSlice';
import settingsReducer from './settingsSlice';
 
 export const store = configureStore({
   reducer: {
     follow: followReducer,
    user: userReducer,
    chirps: chirpsReducer,
    userProfiles: userProfilesReducer,
    savedItems: savedItemsReducer,
    settings: settingsReducer
   },
  devTools: process.env.NODE_ENV !== 'production' || true,
 });
 
 export default store;
export const selectCurrentUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;