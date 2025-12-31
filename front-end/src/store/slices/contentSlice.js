import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchContentList = createAsyncThunk(
  'content/fetchList',
  async ({ type, language, search, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (type) params.append('type', type);
      if (language) params.append('language', language);
      if (search) params.append('search', search);
      params.append('page', page);
      params.append('limit', limit);

      const response = await api.get(`/content/list?${params.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch content');
    }
  }
);

export const fetchContentById = createAsyncThunk(
  'content/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/content/${id}`);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch content');
    }
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    list: [],
    currentContent: null,
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentContent: (state) => {
      state.currentContent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.content;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchContentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchContentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentContent = action.payload;
      })
      .addCase(fetchContentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentContent } = contentSlice.actions;
export default contentSlice.reducer;
