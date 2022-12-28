import { configureStore } from "@reduxjs/toolkit";
import mobileMenuReducer from './headerSlice';
import buttonReducer from './buttonSlice';
import teachersReducer from './teachersSlice';
import telegramReducer from './telegramSlice';
import modalReducer from './modalSlice';
import userReducer from './userSlice';
import reviewsReducer from './reviewsSlice';
import pricesReducer from './pricesSlice';
import faqReducer from './faqSlice';
import locationReducer from './locationSlice';
import futureEventsReducer from './futureEventsSlice';
import futureEventDetailsReducer from './futureEventSignUpData';
import navigationVisibilityReducer from './navigationVisibilitySlice';

export const store = configureStore({
    reducer:{
        mobileMenu: mobileMenuReducer,
        button: buttonReducer,
        teachers: teachersReducer,
        telegram: telegramReducer,
        modal: modalReducer,
        user: userReducer,
        reviews: reviewsReducer,
        prices: pricesReducer,
        faq: faqReducer,
        location: locationReducer,
        futureEvents: futureEventsReducer,
        futureEventDetails: futureEventDetailsReducer,
        navigationVisibility: navigationVisibilityReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;