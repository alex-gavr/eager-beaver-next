import { createSlice } from '@reduxjs/toolkit';
import { IFutureEventDetailsState } from '../types/store-state';

const initialState: IFutureEventDetailsState = {
    futureEventDetails: null, 
};

export const futureEventDetails = createSlice({
    name: 'futureEventDetails',
    initialState,
    reducers: {
        setDetails(state, action) {
            state.futureEventDetails = action.payload;
        },
        resetDetails(state) {
            state.futureEventDetails = null;
        },
    },
})

export const { setDetails, resetDetails } = futureEventDetails.actions;
export default futureEventDetails.reducer;