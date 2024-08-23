'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FullScreen } from '@/components/Spinner';
import { actionSubscribeModify } from '@/data/actions/payAction';

export default function Loading() {
    const router = useRouter();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const error_code = query.get('error_code');

        if (!error_code) {
            // 결제 성공 처리
            actionSubscribeModify();
            // 원하는 작업 수행
            router.push('/order/complete');
        } else {
            // 결제 실패 처리
            const error_msg = query.get('error_msg');
            alert('결제에 실패하였습니다. 에러 내용: ' + error_msg);
            router.push('/order/fail');
        }
    }, [router]);

    return <FullScreen />;
}
