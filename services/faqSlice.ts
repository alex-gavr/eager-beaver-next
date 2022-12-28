import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IFaqState } from '../types/store-state';

const initialState: IFaqState = {
    faq: [],
    loading: null,
    error: false,
};

// FETCH USER DATA
export const fetchFaq = createAsyncThunk('faq/faqData', async () => {
    const response =  await axios.get('/api/fetch-faq');
    return response.data.results.map((data: any) => data.properties);
});

export const faqSlice = createSlice({
    name: 'faq',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFaq.pending, (state) => {
            state.error = false;
            state.loading = true;
        });
        builder.addCase(fetchFaq.fulfilled, (state, action) => {
            state.faq = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchFaq.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });
    },
});

// Action creators are generated for each case reducer function

export default faqSlice.reducer;
