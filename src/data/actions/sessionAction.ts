'use server';

import { auth } from '@/auth';

export async function getUserData() {
    try {
        // 인증 세션 가져오기
        const session = await auth();
        const user = session?.user;

        // 사용자 정보 반환
        return user?.name;
    } catch (error) {
        console.error('Failed to get user data:', error);
        return ''; // 실패 시 null 반환 또는 적절한 기본값 반환
    }
}

export async function getBabyData() {
    try {
        // 인증 세션 가져오기
        const session = await auth();
        const babyInfoData = session?.redirectToBabyInfo;
        // redirectToBabyInfo 정보 반환
        return babyInfoData;
    } catch (error) {
        console.error('Failed to get user data:', error);
        return null; // 실패 시 null 반환 또는 적절한 기본값 반환
    }
}
