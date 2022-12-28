import { createSlice } from '@reduxjs/toolkit';
import { IButtonState } from '../types/store-state';

const initialState: IButtonState = {
    submitIntention: false,
};

export const buttonSlice = createSlice({
    name: 'button',
    initialState,
    reducers: {
        initSubmitIntention(state) {
            state.submitIntention = true;
        },
        resetSubmitIntention(state) {
            state.submitIntention = false;
        },
    }
});

// Action creators are generated for each case reducer function
export const { initSubmitIntention, resetSubmitIntention } = buttonSlice.actions;

export default buttonSlice.reducer;
