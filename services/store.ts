import { configureStore } from "@reduxjs/toolkit";
import buttonReducer from './buttonSlice';
import telegramReducer from './telegramSlice';
import modalReducer from './modalSlice';
import locationReducer from './locationSlice';
import futureEventDetailsReducer from './futureEventSignUpData';
import navigationVisibilityReducer from './navigationVisibilitySlice';

export const store = configureStore({
    reducer:{
        button: buttonReducer,
        telegram: telegramReducer,
        modal: modalReducer,
        location: locationReducer,
        futureEventDetails: futureEventDetailsReducer,
        navigationVisibility: navigationVisibilityReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;