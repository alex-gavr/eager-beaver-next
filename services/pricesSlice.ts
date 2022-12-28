import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPricesState } from '../types/store-state';

const initialState: IPricesState = {
    prices: [],
    loading: null,
    error: false,
};

// FETCH USER DATA
export const fetchPrices = createAsyncThunk('prices/pricesData', async () => {
    const response =  await axios.get('/api/fetch-prices');
    return response.data.results.map((data: any) => data.properties);
});

export const pricesSlice = createSlice({
    name: 'prices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPrices.pending, (state) => {
            state.error = false;
            state.loading = true;
        });
        builder.addCase(fetchPrices.fulfilled, (state, action) => {
            state.prices = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchPrices.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });
    },
});

// Action creators are generated for each case reducer function

export default pricesSlice.reducer;
