import { createSlice } from '@reduxjs/toolkit';
import { IFutureEventDetailsState } from '../types/store-state';

const initialState: IFutureEventDetailsState = {
    futureEventDetails: null, 
    shouldChangeMember: false,
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
        initMemberCountChange(state) {
            state.shouldChangeMember= true;
        },
        resetMemberCountChange(state) {
            state.shouldChangeMember= false;
        }
    },
})

export const { setDetails, resetDetails, initMemberCountChange, resetMemberCountChange } = futureEventDetails.actions;
export default futureEventDetails.reducer;