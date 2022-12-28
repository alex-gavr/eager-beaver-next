import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ITeachersState } from '../types/store-state';

const initialState: ITeachersState = {
    teachers: [],
    loading: null,
    error: false,
};

// FETCH TEACHERS DATA
export const fetchTeachers = createAsyncThunk('teachers/teachersData', async () => {
    const response =  await axios.get('/api/fetch-teachers');
    return response.data.results.map((data: any) => data.properties);

});

export const teachersSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTeachers.pending, (state) => {
            state.error = false;
            state.loading = true;
        });
        builder.addCase(fetchTeachers.fulfilled, (state, action) => {
            state.teachers = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchTeachers.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });
    },
});

// Action creators are generated for each case reducer function

export default teachersSlice.reducer;
