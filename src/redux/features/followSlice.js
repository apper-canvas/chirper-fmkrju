import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Array of usernames that the current user is following
  followedUsers: []
};

export const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    followUser: (state, action) => {
      const username = action.payload;
      if (!state.followedUsers.includes(username)) {
        state.followedUsers.push(username);
      }
    },
    unfollowUser: (state, action) => {
      const username = action.payload;
      state.followedUsers = state.followedUsers.filter(user => user !== username);
    },
    toggleFollowUser: (state, action) => {
      const username = action.payload;
      if (state.followedUsers.includes(username)) {
        state.followedUsers = state.followedUsers.filter(user => user !== username);
      } else {
        state.followedUsers.push(username);
      }
    }
  }
});

export const { followUser, unfollowUser, toggleFollowUser } = followSlice.actions;
export const selectFollowedUsers = (state) => state.follow.followedUsers;
export default followSlice.reducer;