'use client';

import Image from 'next/image';
import { CSSProperties } from 'react';
import { BarLoader, PuffLoader } from 'react-spinners';

const override: CSSProperties = {
    borderRadius: '15px',
};

// 전체 화면 로딩표시
export function FullScreen() {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-60'>
            <div className='flex flex-col items-center'>
                <h3 className='mb-4 text-lg font-medium text-txt'>로딩중...</h3>
                <div className='relative flex justify-center items-center h-[200px]'>
                    <PuffLoader color='#FFC2C5' size={200} />
                    <Image
                        src='/loading_spinner.gif'
                        alt='ILB'
                        width={110}
                        height={110}
                        className='absolute mx-auto inset-0 m-auto'
                    />
                </div>
            </div>
        </div>
    );
}

// 일부분(Component) 로딩표시
export function TargetArea() {
    return (
        <div className='flex flex-col items-center justify-center gap-7 h-[80vh]'>
            <Image
                src='/baby/baby_2.svg'
                alt='ILB'
                width={110}
                height={110}
                className='mx-auto'
            />
            <BarLoader color='#ff8087' cssOverride={override} />
        </div>
    );
}
