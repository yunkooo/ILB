'use server';

import { DeliveryForm, FilteredForm, UserForm } from '@/types';
import { auth } from '@/auth';
import { actionDataFetch } from './fetchAction';
import { revalidatePath } from 'next/cache';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.DB_NAME;

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

export async function emailCheck(email: string) {
    // 이메일 검사
    try {
        const res = await fetch(`${SERVER}/users/email?email=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'client-id': CLIENT_ID,
            },
        });
        const resData = await res.json();
        return resData;
    } catch (error) {
        console.log('error', error);
    }
}

// user 정보 가져오는 action
export async function actionUserData() {
    const session = await auth();
    const userId = session?.user.id;

    if (session) {
        const resData = await actionDataFetch(
            'GET',
            userId,
            session?.accessToken,
        );
        return resData;
    }
    return undefined;
}

// 회원 정보 수정 / 주소 정보 수정 action
export async function actionUserDataModify(
    formData: FilteredForm | DeliveryForm,
) {
    const session = await auth();
    const userId = session?.user.id;

    // 새로운 주소 정보 입력
    const resData = await actionDataFetch(
        'PATCH',
        userId,
        session?.accessToken,
        formData,
    );
    revalidatePath(`/users/${userId}`);
    return resData;
}
