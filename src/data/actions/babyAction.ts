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
