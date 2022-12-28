import { createSlice } from '@reduxjs/toolkit';
import { IHeaderState } from '../types/store-state';

const initialState: IHeaderState = {
    isOpen: false,
    animateMenu: false,
};

export const mobileMenuSlice = createSlice({
    name: 'mobileMenu',
    initialState,
    reducers: {
        openMenu(state) {
            state.isOpen = true;
        },
        closeMenu(state) {
            state.isOpen = false;
            state.animateMenu = false;
        },
        animateBackMenu(state) {
            state.animateMenu = true;
        },
    }
});

// Action creators are generated for each case reducer function
export const { openMenu, closeMenu, animateBackMenu } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;
