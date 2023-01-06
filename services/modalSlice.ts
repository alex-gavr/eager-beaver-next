import { createSlice } from '@reduxjs/toolkit';
import { IModalState } from '../types/store-state';

const initialState: IModalState = {
    isModalOpen: false,
    submitSuccess: null,
    formFromModal: false,
    formFutureEvents: false,
    showPolicy: false,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        onOpenModal(state) {
            state.isModalOpen = true;
        },
        onCloseModal(state) {
            state.isModalOpen = false;
            state.submitSuccess = null;
            state.formFromModal = false;
            state.formFutureEvents= false;
            state.showPolicy= false;
        },
        onOpenModalFormSubmitSuccess(state, action) {
            state.isModalOpen = true;
            state.submitSuccess = action.payload;
        },
        onOpenModalForm(state) {
            state.isModalOpen = true;
            state.formFromModal = true;
        },
        onOpenModalFormFutureEvents(state) {
            state.isModalOpen = true;
            state.formFutureEvents= true;
        },
        onOpenModalPolicy(state) {
            state.isModalOpen = true;
            state.showPolicy= true;
        }
    },
});

export const { onOpenModal, onCloseModal, onOpenModalFormSubmitSuccess, onOpenModalForm, onOpenModalFormFutureEvents, onOpenModalPolicy } = modalSlice.actions;
export default modalSlice.reducer;
