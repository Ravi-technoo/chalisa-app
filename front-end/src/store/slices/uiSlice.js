import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    language: localStorage.getItem('language') || 'hi',
    showMeaning: false,
    isPlaying: false,
    currentAudioUrl: null,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
    toggleMeaning: (state) => {
      state.showMeaning = !state.showMeaning;
    },
    setPlaying: (state, action) => {
      state.isPlaying = action.payload.isPlaying;
      state.currentAudioUrl = action.payload.audioUrl;
    },
    stopPlaying: (state) => {
      state.isPlaying = false;
      state.currentAudioUrl = null;
    },
  },
});

export const { setLanguage, toggleMeaning, setPlaying, stopPlaying } = uiSlice.actions;
export default uiSlice.reducer;
