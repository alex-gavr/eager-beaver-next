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

// FormPopUp FreeClass
export const submitFormDataToTelegram = createAsyncThunk<any, any>('telegram/telegramSubmit', async (formData) => {
    const { name, tel } = formData;
    const message = `
Лера, привет 👋%0A
Новый человек заполнил форму 😯%0A
Имя: ${name}%0A
Номер Телефона: 8${tel}%0A
Свяжемся с ними? 😌
`;
    const url = `https://api.telegram.org/bot${id}/sendMessage?chat_id=${chatIDGavr}&text=${message}`;
    return await axios.get(url);
});
// FormPopUp FutureEvent
export const futureEventSignUpDataToLera = createAsyncThunk<any, any>('telegram/telegramSubmitFutureEvent', async (formData) => {
    const { name, tel, event, age, date } = formData;
    const message = `
Лера, привет 🤍%0A
${name} хочет привести ребенка на ${event} 🎉%0A
Который проходит: ${date}%0A
Там где возраст деток: ${age}%0A
Телефон для связи с ними: 8${tel}%0A
Напиши им 😉
`;
    const url = `https://api.telegram.org/bot${id}/sendMessage?chat_id=${chatIDGavr}&text=${message}`;
    return await axios.get(url);
});

// LERA BLOCK
export const sendUserCityLera = createAsyncThunk<any, any>('telegram/telegramNotifyCityLera', async (userLocation) => {
    const { city, country } = userLocation;
    const message = `
Лера, человек из ${city}, ${country} зашел на сайт🥰
`;
    const url = `https://api.telegram.org/bot${id}/sendMessage?chat_id=${chatIDLera}&text=${message}`;
    return await axios.get(url);
});

export const sendUserLocationLera = createAsyncThunk<any, any>('telegram/telegramNotifyLLera', async (userLocation) => {
    const { latitude, longitude } = userLocation;

    const url = `https://api.telegram.org/bot${id}/sendLocation?chat_id=${chatIDLera}&latitude=${latitude}&longitude=${longitude}&disable_notification=${true}`;
    return await axios.get(url);
});

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
        builder.addCase(submitFormDataToTelegram.pending, (state) => {
            state.error = false;
            state.loading = true;
            state.submitSuccess = null;
            state.submitError = null;
        });
        builder.addCase(submitFormDataToTelegram.fulfilled, (state, action) => {
            state.submitSuccess = action.payload.data.ok;
            state.loading = false;
        });
        builder.addCase(submitFormDataToTelegram.rejected, (state) => {
            state.submitError = true;
            state.loading = null;
            state.error = true;
        });

        builder.addCase(sendUserCityLera.pending, (state) => {
            state.error = false;
            state.loading = true;
            state.locationSubmitted = null;
        });
        builder.addCase(sendUserCityLera.fulfilled, (state, action) => {
            state.locationSubmitted = action.payload.data.ok;
            Cookies.set('LSubmitted', 'True', { expires: 1, path: '/', secure: true, sameSite: 'Lax' });
            state.loading = false;
        });
        builder.addCase(sendUserCityLera.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });

        builder.addCase(futureEventSignUpDataToLera.pending, (state) => {
            state.error = false;
            state.loading = true;
        });
        builder.addCase(futureEventSignUpDataToLera.fulfilled, (state, action) => {
            state.enrolledToFutureEvent = action.payload.data.ok;
            state.loading = false;
        });
        builder.addCase(futureEventSignUpDataToLera.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });
    },
});

// Action creators are generated for each case reducer function
export const { resetSubmitSuccess, resetSubmitError, resetEnrolledToFutureEvent } = telegramSlice.actions;

export default telegramSlice.reducer;
