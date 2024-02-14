import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3000/greetings';

const fetchGreeting = createAsyncThunk('greetings/fetchGreeting', async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch greeting');
    }
    const data = await response.json();
    return data.greeting;
  } catch (error) {
    throw new Error(error.message);
  }
});

const greetingsSlice = createSlice({
  name: 'greetings',
  initialState: {
    greeting: '',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGreeting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGreeting.fulfilled, (state, action) => {
        state.loading = false;
        state.greeting = action.payload;
      })
      .addCase(fetchGreeting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchGreeting };
export default greetingsSlice.reducer;