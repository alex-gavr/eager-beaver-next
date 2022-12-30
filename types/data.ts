// Notion types START
interface IKey {
    title: [
        {
            plain_text: string;
        }
    ];
}
interface IImage {
    files: [
        {
            file: {
                url: string;
            };
        }
    ];
}
interface IAnnotations {
    bold: boolean;
    code: boolean;
    color: string;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
}
interface IText {
    rich_text: [
        {
            plain_text: string;
            annotations: IAnnotations;
        }
    ];
}
interface INumber {
    number: number;
}
interface IDate {
    date: {
        start: string;
        end: string;
    };
}
// Notion types END
export interface ITeacher {
    key: IKey;
    image: IImage;
    name: IText;
    description: IText;
}

export interface IReviews {
    image: IImage;
    key: IKey;
    name: IText;
    parent: IText;
    relationToChild: IText;
    review: IText;
}
export interface IPrices {
    key: IKey;
    name: IText;
    price: IText;
    cardColor: IText;
    feature1: IText;
    feature2: IText;
    feature3: IText;
}

export interface ILocation {
    city: string;
    ip: string;
    latitude: string;
    longitude: string;
    zipcode: string;
    country: string;
}

export interface IFaq {
    key: IKey;
    question: IText;
    answer: IText;
}
export interface IFutureEvent {
    page_id: string;
    properties: {
        key: IKey;
        title: IText;
        description: IText;
        age: IText;
        date: IDate;
        participants: INumber;
        total_spots: INumber;
        price: IText;
    };
}
export interface ILink {
    id: number;
    name: string;
    to: string;
}

export interface IDeviceType {
    isMobileOnly: boolean;
    isTablet: boolean; 
    isDesktop: boolean;
}