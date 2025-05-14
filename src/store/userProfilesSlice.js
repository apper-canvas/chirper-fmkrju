import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userProfileService } from '../services/userProfileService';

const initialState = {
  profiles: [],
  currentProfile: null,
  isLoading: false,
  error: null
};

// Async thunks for API operations
export const fetchUserProfiles = createAsyncThunk(
  'userProfiles/fetchUserProfiles',
  async (params, { rejectWithValue }) => {
    try {
      const response = await userProfileService.getUserProfiles(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserProfileById = createAsyncThunk(
  'userProfiles/fetchUserProfileById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await userProfileService.getUserProfileById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'userProfiles/updateUserProfile',
  async ({ id, profileData }, { rejectWithValue }) => {
    try {
      const response = await userProfileService.updateUserProfile(id, profileData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userProfilesSlice = createSlice({
  name: 'userProfiles',
  initialState,
  reducers: {
    clearProfiles: (state) => {
      state.profiles = [];
    },
    setCurrentProfile: (state, action) => {
      state.currentProfile = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUserProfiles
      .addCase(fetchUserProfiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profiles = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle fetchUserProfileById
      .addCase(fetchUserProfileById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfileById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProfile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfileById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle updateUserProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProfile = action.payload;
        // Update the profile in the profiles array if it exists
        const index = state.profiles.findIndex(profile => profile.Id === action.payload.Id);
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearProfiles, setCurrentProfile } = userProfilesSlice.actions;
export default userProfilesSlice.reducer;