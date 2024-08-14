import { UserForm } from './../../types/user';
import { Method, BabyInputForm } from '@/types';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export async function actionDataFetch(
    method: Method,
    body?: UserForm | BabyInputForm | string | null,
    userId?: string,
    accessToken?: string,
) {
    const options: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'client-id': '05-ILB',
            Authorization: `Bearer ${accessToken}`,
        },
    };
    if (method !== 'GET') {
        options.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const res = await fetch(`${SERVER}/users/${userId}`, options);

    if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'API 요청에 실패하였습니다.');
    }

    const resData = await res.json();
    return resData;
}
