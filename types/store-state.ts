import { IFaq, IFutureEvent, ILocation, IPrices, IReviews, ITeacher } from './data';

export interface LoadingAndError {
    loading: boolean | null;
    error: boolean;
}

export interface IButtonState {
    submitIntention: boolean;
}

export interface IHeaderState {
    isOpen: boolean;
    animateMenu: boolean;
}
export interface ITeachersState extends LoadingAndError {
    teachers: ITeacher[];
}
export interface IReviewsState extends LoadingAndError {
    reviews: IReviews[];
}
export interface IPricesState extends LoadingAndError {
    prices: IPrices[];
}
export interface IFaqState extends LoadingAndError {
    faq: IFaq[];
}
export interface ILocationState extends LoadingAndError {
    userLocation: ILocation | null;
}
export interface IFutureEventsState extends LoadingAndError {
    futureEvents: IFutureEvent[];
    participantUpdateStatus: number | null;
    longLoading: boolean;
}

export interface ITelegram extends LoadingAndError {
    submitSuccess: boolean | null;
    submitError: boolean | null;
    locationSubmitted: boolean | null;
    enrolledToFutureEvent: boolean | null;
}

export interface IModalState {
    isOpen: boolean;
}

export interface IUserState extends LoadingAndError {
    formSubmitSuccess: boolean | null;
}

export interface IFutureEventDetailsState {
    futureEventDetails: {
        title: string;
        age: string;
        dateFull: string;
    } | null;
}
export interface IFooterState{
    footerVisible: boolean;
    headerVisible: boolean;
}
