import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { IUserState } from '../types/store-state';
import {v4 as uuid} from 'uuid';

const initialState: IUserState = {
    formSubmitSuccess: null,
    loading: null,
    error: false,
};


export const formSubmit = createAsyncThunk<any, any>('user/userFormSubmit', async (values) => {
    const id = uuid();
    const beaver_coins = 500;
    const email = 'we@donno.com'
    const { name, tel } = values;
    const phone = `+7${tel}`;
    const response = await axios.post('/api/post-user', {
        id: id,
        name: name,
        email: email,
        phone: phone,
        beaver_coins: beaver_coins,
    });
    return response.data;
});


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(formSubmit.pending, (state) => {
            state.error = false;
            state.loading = true;
            state.formSubmitSuccess = null;
        });
        builder.addCase(formSubmit.fulfilled, (state, action) => {
            state.formSubmitSuccess = true;
            state.loading = false;
        });
        builder.addCase(formSubmit.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });
    },
});


export default userSlice.reducer;