import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchInitialData = createAsyncThunk(
  'initial_data',
  async (userId) => {
    const response = await axios.get(
      '/api/v1/data',
      {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      },
    );

    return response.data;
  },
);

export default fetchInitialData;
