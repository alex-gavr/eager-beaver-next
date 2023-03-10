import { createSlice } from '@reduxjs/toolkit';
import { INavigationState } from '../types/store-state';

const initialState: INavigationState = {
    footerVisible: false,
    headerVisible: true,
};

export const navigationVisibilitySlice = createSlice({
    name: 'navigationVisibility',
    initialState,
    reducers: {
        footerVisibilityStatus(state, action) {
            state.footerVisible = action.payload;
        },
        headerVisibilityStatus(state, action) {
            state.headerVisible = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { footerVisibilityStatus, headerVisibilityStatus } = navigationVisibilitySlice.actions;

export default navigationVisibilitySlice.reducer;
