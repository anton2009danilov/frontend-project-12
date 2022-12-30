import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchInitialData = createAsyncThunk(
  'fetchInitialData',
  async (userId) => {
    console.log('fetch initial data');

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
