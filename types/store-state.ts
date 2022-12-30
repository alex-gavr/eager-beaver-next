import { ILocation } from './data';

export interface LoadingAndError {
    loading: boolean | null;
    error: boolean;
}

export interface IButtonState {
    submitIntention: boolean;
}

export interface ILocationState extends LoadingAndError {
    userLocation: ILocation | null;
}

export interface ITelegram extends LoadingAndError {
    submitSuccess: boolean | null;
    submitError: boolean | null;
    locationSubmitted: boolean | null;
    enrolledToFutureEvent: boolean | null;
}

export interface IModalState {
    isModalOpen: boolean;
    submitSuccess: boolean | null;
    formFromModal: boolean;
    formFutureEvents: boolean,
}

export interface IFutureEventDetailsState {
    futureEventDetails: {
        title: string;
        age: string;
        dateFull: string;
    } | null;
    shouldChangeMember: boolean;
}
export interface INavigationState{
    footerVisible: boolean;
    headerVisible: boolean;
}
