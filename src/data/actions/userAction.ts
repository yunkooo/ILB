'use server';

import { UserForm } from '@/types';
import { auth } from '@/auth';
import { actionDataFetch } from './fetchAction';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.DB_NAME;

type LoginForm = {
    email: string;
    password: string;
};

export async function signup(formData: UserForm) {
    // 회원 가입
    const res = await fetch(`${SERVER}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'client-id': CLIENT_ID,
        },
        body: JSON.stringify(formData),
    });

    const resData = await res.json();
    return resData;
}

export async function actionUserData() {
    const session = await auth();
    const userId = session?.user.id;

    const resData = await actionDataFetch('GET', userId, session?.accessToken);
    return resData;
}

// 주소 정보 입력
export async function actionAddress(formData: any) {
    const session = await auth();
    const userId = session?.user.id;

    // 새로운 주소 정보 입력
    const resData = await actionDataFetch(
        'PATCH',
        userId,
        session?.accessToken,
        formData,
    );
    return resData;
}
