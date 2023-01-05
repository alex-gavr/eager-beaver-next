import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './modalSlice';
import futureEventDetailsReducer from './futureEventSignUpData';
import navigationVisibilityReducer from './navigationVisibilitySlice';
import errorReducer from './errorSlice'

export const store = configureStore({
    reducer:{
        modal: modalReducer,
        futureEventDetails: futureEventDetailsReducer,
        navigationVisibility: navigationVisibilityReducer,
        error: errorReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;