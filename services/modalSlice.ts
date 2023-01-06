import { createSlice } from '@reduxjs/toolkit';
import { IModalState } from '../types/store-state';

const initialState: IModalState = {
    isModalOpen: false,
    submitSuccess: null,
    formFromModal: false,
    formFutureEvents: false,
    showPolicy: false,
    initSubmitFrom: false,
    initSubmitFutureEvent: false,
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
            state.formFutureEvents = false;
            state.showPolicy = false;
            state.initSubmitFrom = false;
            state.initSubmitFutureEvent = false;
        },
        onOpenModalFormSubmitSuccess(state, action) {
            state.isModalOpen = true;
            state.submitSuccess = action.payload;
        },
        onOpenModalForm(state) {
            state.isModalOpen = true;
            state.formFromModal = true;
            state.initSubmitFrom = true;
        },
        onOpenModalFormFutureEvents(state) {
            state.isModalOpen = true;
            state.formFutureEvents = true;
            state.initSubmitFutureEvent = true;
        },
        onOpenModalPolicy(state) {
            state.isModalOpen = true;
            if (state.initSubmitFrom) {
                state.formFromModal = false;
            }  
            if (state.initSubmitFutureEvent) {
                state.formFutureEvents = false;
            }
            state.showPolicy = true;
        },
        showForm(state) {
            // Тут мы решаем какую форму показать обратно. 
            if (state.initSubmitFrom) {
                state.formFromModal = true;
            } else if (state.initSubmitFutureEvent) {
                state.formFutureEvents = true;
            }
            state.showPolicy = false;
        },
    },
});

export const { onOpenModal, onCloseModal, onOpenModalFormSubmitSuccess, onOpenModalForm, onOpenModalFormFutureEvents, onOpenModalPolicy, showForm } = modalSlice.actions;
export default modalSlice.reducer;
