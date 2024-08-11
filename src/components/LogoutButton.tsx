'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
    return (
        <button
            className='py-[19px] px-[19px] text-left'
            onClick={() => {
                signOut();
            }}>
            로그아웃
        </button>
    );
}
