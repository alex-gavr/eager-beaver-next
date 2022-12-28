import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IReviewsState } from '../types/store-state';

const initialState: IReviewsState = {
    reviews: [],
    loading: null,
    error: false,
};

// FETCH USER DATA
export const fetchReviews = createAsyncThunk('reviews/reviewsData', async () => {
    const response = await axios.get('/api/fetch-reviews');
    return response.data.results.map((data: any) => data.properties);
});

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchReviews.pending, (state) => {
            state.error = false;
            state.loading = true;
        });
        builder.addCase(fetchReviews.fulfilled, (state, action) => {
            state.reviews = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchReviews.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });
    },
});

// Action creators are generated for each case reducer function

export default reviewsSlice.reducer;
