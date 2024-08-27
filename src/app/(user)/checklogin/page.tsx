'use client';

import { useRouter } from 'next/navigation';
import { FullScreen } from '@/components/Spinner';
import { actionUserData } from '@/data/actions/userAction';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

async function fetchUserData() {
    const { item: userData } = await actionUserData();
    return userData;
}
export default function Loading() {
    const router = useRouter();

    const { isSuccess, data: userData } = useQuery({
        queryKey: ['userData'],
        queryFn: fetchUserData,
    });

    useEffect(() => {
        if (isSuccess) {
            if (userData.extra.baby) {
                router.push('/');
            } else {
                router.push('/checklogin/babyinfo');
            }
        }
    }, [isSuccess, userData, router]);

    return <FullScreen />;
}
