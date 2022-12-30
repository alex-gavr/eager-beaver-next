import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ITelegram } from '../types/store-state';

const initialState: ITelegram = {
    submitSuccess: null,
    submitError: null,
    locationSubmitted: null,
    enrolledToFutureEvent: null,
    loading: null,
    error: false,
};

const id = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const chatIDLera = process.env.NEXT_PUBLIC_TELEGRAM_LERA_ID;
const chatIDGavr = process.env.NEXT_PUBLIC_TELEGRAM_GAVR_ID;

// GAVR BLOCK

export const sendUserCityGavr = createAsyncThunk<any, any>('telegram/telegramNotifyCityGavr', async (userLocation) => {
    const { city, ipAddress, country } = userLocation;
    const message = `
Гавр, человек из ${city}, ${country} зашел на сайт🥰%0A
IP: ${ipAddress}
`;
    const url = `https://api.telegram.org/bot${id}/sendMessage?chat_id=${chatIDGavr}&text=${message}`;
    return await axios.get(url);
});

export const sendUserLocationGavr = createAsyncThunk<any, any>('telegram/telegramNotifyLGavr', async (userLocation) => {
    const { latitude, longitude } = userLocation;

    const url = `https://api.telegram.org/bot${id}/sendLocation?chat_id=${chatIDGavr}&latitude=${latitude}&longitude=${longitude}&disable_notification=${true}`;
    return await axios.get(url);
});

export const telegramSlice = createSlice({
    name: 'telegram',
    initialState,
    reducers: {
        resetSubmitSuccess(state) {
            state.submitSuccess = null;
        },
        resetSubmitError(state) {
            state.submitSuccess = null;
            state.error = false;
        },
        resetEnrolledToFutureEvent(state) {
            state.enrolledToFutureEvent = null;
            state.error = false;
        },
    },
    extraReducers: (builder) => {
        
    },
});

// Action creators are generated for each case reducer function
export const { resetSubmitSuccess, resetSubmitError, resetEnrolledToFutureEvent } = telegramSlice.actions;

export default telegramSlice.reducer;
