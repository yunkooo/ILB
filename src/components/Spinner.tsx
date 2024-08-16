'use client';

import { HashLoader, PuffLoader, ScaleLoader } from 'react-spinners';

// 전체 화면 로딩표시
export function FullScreen() {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-60'>
            <div className='flex flex-col items-center'>
                <h3 className='mb-4 text-lg font-semibold'>
                    잠시만 기다려주세요.
                </h3>
                <PuffLoader color='#ff8087' size={200} />
            </div>
        </div>
    );
}

// 일부분(Component) 로딩표시
export function TargetArea() {
    return (
        <div className='flex justify-center'>
            <HashLoader color='#ff8087' />
        </div>
    );
}
