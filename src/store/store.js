 import { configureStore } from '@reduxjs/toolkit';
import followReducer from './features/followSlice';
import followReducer from './followSlice';
import userReducer from './userSlice';
import chirpsReducer from './chirpsSlice';
import userProfilesReducer from './userProfilesSlice';
import savedItemsReducer from './savedItemsSlice';
 
 export const store = configureStore({
   reducer: {
     follow: followReducer,
    user: userReducer,
    chirps: chirpsReducer,
    userProfiles: userProfilesReducer,
    savedItems: savedItemsReducer
   },
  devTools: process.env.NODE_ENV !== 'production',
  devTools: true,
 });
 
 export default store;
export const selectCurrentUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;