'use client';

import { usePathname } from 'next/navigation';
import BackHeader from './BackHeader';
import Header from './Header';
import StepHeader from './StepHeader';

export default function HeaderSelector() {
    const pathname = usePathname();
    const paths = ['signup', 'editprofile', 'subscribe', 'babyinfo'];

    // paths 배열의 경로 중 하나라도 현재 경로 pathname에 포함되어 있는지 확인
    const isMatchPath = paths.some(path => pathname.includes(path));
    const isMatchOrderPath = pathname.includes('order');

    return isMatchOrderPath ? (
        <StepHeader />
    ) : isMatchPath ? (
        <BackHeader />
    ) : (
        <Header />
    );
}
