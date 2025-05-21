import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chirpService } from '../services/chirpService';

const initialState = {
  chirps: [],
  currentChirp: null,
  isLoading: false,
  error: null
};

// Async thunks for API operations
export const fetchChirps = createAsyncThunk(
  'chirps/fetchChirps',
  async (params, { rejectWithValue }) => {
    try {
      const response = await chirpService.fetchChirps(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchChirpById = createAsyncThunk(
  'chirps/fetchChirpById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await chirpService.getChirpById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createChirp = createAsyncThunk(
  'chirps/createChirp',
  async (chirpData, { rejectWithValue }) => {
    try {
      console.log("createChirp thunk with data:", chirpData);
      const response = await chirpService.createChirp(chirpData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chirpsSlice = createSlice({
  name: 'chirps',
  initialState,
  reducers: {
    clearChirps: (state) => {
      state.chirps = [];
    },
    setCurrentChirp: (state, action) => {
      state.currentChirp = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchChirps
      .addCase(fetchChirps.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChirps.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chirps = action.payload;
        state.error = null;
      })
      .addCase(fetchChirps.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle fetchChirpById
      .addCase(fetchChirpById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChirpById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentChirp = action.payload;
        state.error = null;
      })
      .addCase(fetchChirpById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle createChirp
      .addCase(createChirp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChirp.fulfilled, (state, action) => {
        state.isLoading = false;
        // Check if payload exists before trying to add it
        if (action.payload) {
          // Add the new chirp to the beginning of the array
          if (Array.isArray(state.chirps)) {
            state.chirps.unshift(action.payload);
          }
        }
        state.error = null;
      })
      .addCase(createChirp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearChirps, setCurrentChirp } = chirpsSlice.actions;
export default chirpsSlice.reducer;