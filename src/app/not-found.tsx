'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function notFound() {
    return (
        <div className='flex flex-col items-center py-20 bg-white text-txt p-4 space-y-2 h-screen'>
            <h1 className='text-2xl font-medium mt-[8%] text-center'>
                페이지를 찾을 수 없어요!
            </h1>
            <Image
                src={'/not-found.webp'}
                alt='에러 페이지'
                width={200}
                height={200}
                className='py-[10%]'
            />
            <p className='text-center break-keep'>
                걱정하지 마세요, 다른 유용한 정보로 안내해 드릴게요.
            </p>
            <div className='fixed p-[2px] bottom-[60px] max-w-default w-default h-default text-center bg-gradient-to-r from-[#FF8087] to-[#FFAD6E] rounded-default'>
                <Link
                    href='/'
                    className='flex justify-center items-center bg-white w-full h-14 rounded-default hover:bg-gradient-to-r from-[#FF8087] to-[#FFAD6E]'>
                    🏠 집으로 돌아가기
                </Link>
            </div>
        </div>
    );
}
