'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/zustand/userStore';
import { actionUserData } from '@/data/actions/userAction';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

async function fetchUserData() {
    const { item: userData } = await actionUserData();
    return userData;
}

export default function SessionHandler() {
    const { setUser, reset } = useUserStore();
    const pathname = usePathname();

    const { data: userData, refetch } = useQuery({
        queryKey: ['userData'],
        queryFn: fetchUserData,
        staleTime: 0,
    });

    useEffect(() => {
        refetch();
    }, [pathname, refetch]);

    useEffect(() => {
        if (userData) {
            setUser({ id: userData.id, name: userData.name });
        } else {
            reset();
        }
    }, [userData, setUser, reset]);
    return null;
}
