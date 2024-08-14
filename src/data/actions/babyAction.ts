'use server';
import { format } from 'date-fns';

import { auth } from '@/auth';
import { RemakeBabyForm } from '@/types/baby';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export async function actionBabyInfo(formData: RemakeBabyForm) {
    const session = await auth();
    const userId = session?.user.id;
    // 아이 정보 입력
    const res = await fetch(`${SERVER}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'client-id': '05-ILB',
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(formData),
    });

    const resData = await res.json();
    return resData;
}

// 마이페이지 -> 아이 정보 수정 페이지
export async function actionBabyBodyInfo(formData: {
    weight: string;
    height: string;
}) {
    const session = await auth();
    const userId = session?.user.id;

    const formattedDate = format(new Date(), 'yyyyMMdd');

    // 아이 정보 가져오기
    const resBaby = await fetch(`${SERVER}/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'client-id': '05-ILB',
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    const resBabyData = await resBaby.json();
    const userExtra = resBabyData.item.extra;

    const remakeFormData = {
        extra: {
            ...userExtra,
            baby: {
                ...userExtra.baby,
                name: userExtra.baby.name,
                month: userExtra.baby.month,
                gender: userExtra.baby.gender,
                birth: userExtra?.baby.birth,
                grow: [
                    {
                        weight: formData.weight,
                        height: formData.height,
                        date: formattedDate,
                    },
                    ...userExtra.baby.grow,
                ],
            },
        },
    };

    // 아이 정보 입력
    const res = await fetch(`${SERVER}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'client-id': '05-ILB',
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(remakeFormData),
    });
    const resData = await res.json();
    console.log('server', resData);
    return resData;
}

export async function getBabyData() {
    const session = await auth();
    const userId = session?.user.id;

    if (session) {
        const res = await fetch(`${SERVER}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'client-id': '05-ILB',
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const resData = await res.json();

        return resData;
    }
}
