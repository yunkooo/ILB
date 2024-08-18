'use server';

import { auth } from '@/auth';

// session 데이터 가져오는 action
export async function getUserData() {
    try {
        // 인증 세션 가져오기
        const session = await auth();

        // 사용자 정보 반환
        return session;
    } catch (error) {
        console.error('Failed to get user data:', error);
        return ''; // 실패 시 null 반환 또는 적절한 기본값 반환
    }
}
