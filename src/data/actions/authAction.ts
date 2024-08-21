// 서버 액션 정의
'use server';

import { signIn } from '@/auth';
import { OAuthUser } from '@/types';
import { redirect } from 'next/navigation';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

// email/password 로그인
export async function signInWithCredentials(formData: FormData) {
    try {
        const result = await signIn('credentials', {
            email: formData.get('email') || '',
            password: formData.get('password') || '',
            redirect: false,
        });
        return result;
    } catch (error) {
        console.error(error);
    }
    // redirect('/');
}

export async function signInWithGithub(formData: FormData) {
    await signIn('github', { redirectTo: '/' });
}

export async function signInWithGoogle() {
    await signIn('google', { redirectTo: '/checklogin' });
}

export async function signInWithNaver(formData: FormData) {
    await signIn('naver', { redirectTo: '/' });
}

export async function signInWithKakao(formData: FormData) {
    await signIn('kakao', { redirectTo: '/' });
}

// auth provider 인증 후 자동 회원 가입
export async function signupWithOAuth(user: OAuthUser) {
    const res = await fetch(`${SERVER}/users/signup/oauth`, {
        method: 'POST',
        headers: {
            'client-id': '05-ILB',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    return res.json();
}

// auth provider로 인증된 사용자 로그인
export async function loginOAuth(providerAccountId: string) {
    const res = await fetch(`${SERVER}/users/login/with`, {
        method: 'POST',
        headers: {
            'client-id': '05-ILB',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ providerAccountId }),
    });

    return res.json();
}
