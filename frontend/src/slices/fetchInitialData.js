import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchInitialData = createAsyncThunk(
  'fetchInitialData',
  async (userId) => {
    console.log('fetch initial data');
    console.log(userId);
    const response = await axios.get(
      '/api/v1/data',
      {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      },
    );

    console.log(response);

    return response.data;
  },
);

export default fetchInitialData;
