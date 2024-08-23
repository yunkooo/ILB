export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface ResError<E> {
    type: string;
    value: string;
    msg: string;
    path: keyof E;
    location: string;
}
