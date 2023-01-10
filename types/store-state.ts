export interface LoadingAndError {
    loading: boolean | null;
    error: boolean;
}

export interface IButtonState {
    submitIntention: boolean;
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
    showPolicy: boolean;
    initSubmitFrom: boolean;
    initSubmitFutureEvent: boolean;
}

export interface IFutureEventDetailsState {
    futureEventDetails: {
        title: string;
        age: string;
        dateFull: string;
        participants: string;
        page_id: number;
    } | null;
    shouldChangeMember: boolean;
}
export interface INavigationState{
    footerVisible: boolean;
    headerVisible: boolean;
}
export interface IError {
    error: boolean;
}
export interface IHomeLoader {
    showLoader: boolean;
}