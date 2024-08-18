'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBabyData } from '@/data/actions/babyAction';
import { FullScreen } from '@/components/Spinner';

export default function loading() {
    const router = useRouter();

    useEffect(() => {
        async function fetchUserData() {
            const res = await getBabyData();

            // user 데이터에 baby 값이 들어있으면 메인 페이지, 없다면 babyinfo 페이지로 이동
            if (res.item.extra.baby) {
                router.push('/');
            } else {
                router.push('/checklogin/babyinfo');
            }
        }
        fetchUserData();
    }, []);

    return <FullScreen />;
}
