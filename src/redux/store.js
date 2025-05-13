import { configureStore } from '@reduxjs/toolkit';
import followReducer from './features/followSlice';

export const store = configureStore({
  reducer: {
    follow: followReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export const selectFollowedUsers = (state) => state.follow.followedUsers;