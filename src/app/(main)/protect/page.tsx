'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBabyData } from '@/data/actions/sessionAction';

export default function ProtectedPage() {
    const router = useRouter();
    useEffect(() => {
        async function fetchUserData() {
            const res = await getBabyData();
            if (res) {
                router.push('/babyinfo');
            } else {
                router.push('/');
            }
        }
        fetchUserData();
    }, []);

    return <div>Protected Content</div>;
}
