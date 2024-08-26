'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function notFound() {
    return (
        <div className='py-20 bg-white text-black p-4 flex flex-col items-center space-y-2 h-screen'>
            <h1 className='text-lg font-semibold mt-20 text-center'>
                페이지를 찾을 수 없습니다.
            </h1>
            <Image
                src={'/not-found.webp'}
                alt='에러 페이지'
                width={200}
                height={200}
                className='absolute top-[32%]'
            />
            <Link
                href='/'
                className='absolute bottom-1/4 border-2 w-1/2  text-center text-black py-2 px-4 rounded-3xl border-red-400 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400'>
                🏠 집으로 돌아가기
            </Link>
        </div>
    );
}
