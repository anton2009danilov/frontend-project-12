import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes';

const fetchInitialData = createAsyncThunk(
  'fetchInitialData',
  async (userId) => {
    const response = await axios.get(
      routes.initialDataPath(),
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
