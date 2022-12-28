import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IFutureEventsState } from '../types/store-state';

const initialState: IFutureEventsState = {
    futureEvents: [],
    participantUpdateStatus: null,
    loading: null,
    error: false,
    longLoading: false,
};


export const fetchFutureEvents = createAsyncThunk('events/futureEvents', async () => {
    const response = await axios.get('/api/fetch-future-events');
    return response.data.results.map((data: any) => {
        return {
            page_id: data.id,
            properties: data.properties,
        };
    });
});

export const addParticipant = createAsyncThunk<any, any>('events/addParticipant', async (options) => {
    const { page_id, members } = options;
    const response = await axios.post('/api/update-events-members', {
        page_id: page_id,
        participants: members,
    });
    return response.data.properties.participants.number;
});

export const futureEventsSlice = createSlice({
    name: 'futureEvents',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFutureEvents.pending, (state) => {
            state.error = false;
            state.loading = true;
        });
        builder.addCase(fetchFutureEvents.fulfilled, (state, action) => {
            state.futureEvents = action.payload;
            state.loading = false;
            state.longLoading = false;
        });
        builder.addCase(fetchFutureEvents.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });

        builder.addCase(addParticipant.pending, (state) => {
            state.error = false;
            state.loading = true;
            state.participantUpdateStatus = null;
            state.longLoading = true;
        });
        builder.addCase(addParticipant.fulfilled, (state, action) => {
            state.participantUpdateStatus = action.payload;
            state.loading = false;
        });
        builder.addCase(addParticipant.rejected, (state) => {
            state.loading = null;
            state.error = true;
        });
    },
});

// Action creators are generated for each case reducer function

export default futureEventsSlice.reducer;
