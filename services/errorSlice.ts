import { createSlice } from '@reduxjs/toolkit';
import { IError } from '../types/store-state';

const initialState: IError = {
    error: false
};

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        initError(state) {
            state.error = true;
        },
        resetError(state) {
            state.error = false;
        },
    }
});

// Action creators are generated for each case reducer function
export const { initError, resetError } = errorSlice.actions;

export default errorSlice.reducer;