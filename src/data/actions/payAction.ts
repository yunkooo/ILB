'use server';

import { format } from 'date-fns';

import { auth } from '@/auth';
import { actionDataFetch } from './fetchAction';

// 결제 완료 시 구독에 대한 DB 수정
export async function actionSubscribeModify() {
    const session = await auth();
    const userId = session?.user.id;

    const formattedDate = format(new Date(), 'yyyyMMdd');

    // 유저 정보 전체 가져오기
    const userData = await actionDataFetch('GET', userId, session?.accessToken);

    // 유저 정보에서 extra 정보만 추출
    const userExtra = userData.item.extra;

    const formData = {
        extra: {
            ...userExtra,
            subscribe: {
                statue: 'true',
                date: formattedDate,
            },
        },
    };

    // 새로운 주소 정보 입력
    const resData = await actionDataFetch(
        'PATCH',
        userId,
        session?.accessToken,
        formData,
    );
    return resData;
}
