'use server';
import { format } from 'date-fns';

import { auth } from '@/auth';
import { BabyBody, RemakeBabyForm } from '@/types/baby';
import { actionDataFetch } from './fetchAction';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

// 회원가입과 아이정보 분리해서 입력할때 사용했던 action
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
export async function actionBabyBodyInfo(formData: BabyBody) {
    const session = await auth();
    const userId = session?.user.id;

    const formattedDate = format(new Date(), 'yyyyMMdd');

    // 유저 정보 전체 가져오기
    const userData = await actionDataFetch('GET', userId, session?.accessToken);

    // 유저 정보에서 extra 정보만 추출
    const userExtra = userData.item.extra;

    // extra data에 새로운 아이 body data 넣어서 통째로 수정
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
    const resData = await actionDataFetch(
        'PATCH',
        userId,
        session?.accessToken,
        remakeFormData,
    );
    return resData;
}

export async function getBabyData() {
    const session = await auth();
    const userId = session?.user.id;

    const resData = await actionDataFetch('GET', userId, session?.accessToken);

    return resData;
}
