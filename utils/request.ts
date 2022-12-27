import { checkResponse } from './checkResponse';

interface IOptions {
    method: string;
    headers: {
        'Content-Type': string;
        Authorization?: string;
    };
    body?: any;
}

export const request = (url: RequestInfo | URL, options: IOptions | undefined) => {
    return fetch(url, options).then(checkResponse);
};
