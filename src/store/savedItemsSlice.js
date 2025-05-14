import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { savedItemService } from '../services/savedItemService';

const initialState = {
  savedItems: [],
  isLoading: false,
  error: null
};

// Async thunks for API operations
export const fetchSavedItems = createAsyncThunk(
  'savedItems/fetchSavedItems',
  async (params, { rejectWithValue }) => {
    try {
      const response = await savedItemService.getSavedItems(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveItem = createAsyncThunk(
  'savedItems/saveItem',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await savedItemService.saveItem(itemData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeSavedItem = createAsyncThunk(
  'savedItems/removeSavedItem',
  async (id, { rejectWithValue }) => {
    try {
      await savedItemService.removeSavedItem(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const savedItemsSlice = createSlice({
  name: 'savedItems',
  initialState,
  reducers: {
    clearSavedItems: (state) => {
      state.savedItems = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchSavedItems
      .addCase(fetchSavedItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSavedItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedItems = action.payload;
        state.error = null;
      })
      .addCase(fetchSavedItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle saveItem
      .addCase(saveItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedItems.unshift(action.payload);
        state.error = null;
      })
      .addCase(saveItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle removeSavedItem
      .addCase(removeSavedItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeSavedItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedItems = state.savedItems.filter(item => item.Id !== action.payload);
        state.error = null;
      })
      .addCase(removeSavedItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSavedItems } = savedItemsSlice.actions;
export default savedItemsSlice.reducer;