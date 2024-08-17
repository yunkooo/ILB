'use client';

import { usePathname } from 'next/navigation';
import BackHeader from './BackHeader';
import Header from './Header';

export default function HeaderSelector() {
    const pathname = usePathname();
    const paths = ['delivery', 'editprofile', 'subscribe', 'babyinfo'];

    // paths 배열의 경로 중 하나라도 현재 경로 pathname에 포함되어 있는지 확인
    const isMatchPath = paths.some(path => pathname.includes(path));

    return isMatchPath ? <BackHeader /> : <Header />;
}
