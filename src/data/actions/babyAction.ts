'use server';

// import { UserForm } from '@/types';

export type BabyForm = {
    name: string;
    month: string;
    birth: string;
    height: number;
    weight: number;
    gender: string;
};

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export async function actionBabyInfo(formData: BabyForm) {
    // 회원 가입
    const res = await fetch(`${SERVER}/users/8`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const resData = await res.json();

    return resData;
}
