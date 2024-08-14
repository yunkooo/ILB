'use server';

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

    const newDay = new Date();

    const year = newDay.getFullYear();
    const month = String(newDay.getMonth() + 1).padStart(2, '0');
    const day = String(newDay.getDate()).padStart(2, '0');

    const formattedDate = `${year}${month}${day}`;

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
                    ...userExtra.baby.grow,
                    {
                        weight: formData.weight,
                        height: formData.height,
                        date: formattedDate,
                    },
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
