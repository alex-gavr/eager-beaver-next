import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ILocationState } from '../types/store-state';

const initialState: ILocationState = {
    userLocation: null,
    loading: null,
    error: false,
};

const { REACT_APP_IP_GEOLOCATION_TOKEN } = process.env;

const ulr = `https://api.ipgeolocation.io/ipgeo?apiKey=${REACT_APP_IP_GEOLOCATION_TOKEN}`;

// FETCH LOCATION DATA
export const fetchLocation = createAsyncThunk<any>('location/locationData', async () => {
    const response =  await axios.get(ulr);
    const data =  {
        city: response.data.city,
        ip: response.data.ip,
        latitude: response.data.latitude,
        longitude: response.data.longitude,
        zipcode: response.data.zipcode,
        country: response.data.country_code3,
    };
    return data;
});

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLocation.pending, (state) => {
            state.error = false;
            state.loading = true;
        });
        builder.addCase(fetchLocation.fulfilled, (state, action) => {
            state.userLocation = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchLocation.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });
    },
});

// Action creators are generated for each case reducer function

export default locationSlice.reducer;