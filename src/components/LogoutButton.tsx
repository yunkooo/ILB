'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
    return (
        <button
            className='py-[19px] px-[19px] text-left'
            onClick={() => {
                localStorage.setItem('toastMessage', `로그아웃 되었습니다.`);
                signOut({ callbackUrl: '/login' });
            }}>
            로그아웃
        </button>
    );
}
