import { createSlice } from '@reduxjs/toolkit';
import { IModalState } from '../types/store-state';

const initialState: IModalState = {
    isOpen: false,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        onOpenModal(state) {
            state.isOpen = true;
        },
        onCloseModal(state) {
            state.isOpen = false;
        },
    },
});

export const { onOpenModal, onCloseModal } = modalSlice.actions;
export default modalSlice.reducer;
