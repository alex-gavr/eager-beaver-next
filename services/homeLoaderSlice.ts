import { createSlice } from '@reduxjs/toolkit';
import { IHomeLoader } from '../types/store-state';

const initialState: IHomeLoader = {
    showLoader: true, 
};

export const homeLoaderSlice = createSlice({
    name: 'homeLoader',
    initialState,
    reducers: {
        resetHomeLoader(state) {
            state.showLoader = false;
        },
    },
})

export const { resetHomeLoader } = homeLoaderSlice.actions;
export default homeLoaderSlice.reducer;