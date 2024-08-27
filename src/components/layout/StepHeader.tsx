'use client';

import { GoChevronRight } from 'react-icons/go';
import { FaArrowLeft } from 'react-icons/fa6';
import useScrollPosition from '@/hooks/useScroll';
import { usePathname } from 'next/navigation';
import React from 'react';

interface PaymentStatus {
    pathname: string;
    component: React.ReactNode;
}

const PaymentStatuses: PaymentStatus[] = [
    {
        pathname: '/order',
        component: <p>아이정보</p>,
    },
    {
        pathname: '/order/delivery',
        component: <p>배송정보</p>,
    },
    {
        pathname: '/order/payment',
        component: <p>결제수단</p>,
    },
];

export default function StepHeader() {
    const pathname = usePathname();

    const { scrollPosition } = useScrollPosition();

    const handleBack = () => {
        window.history.back();
    };

    return (
        <header
            className={`${scrollPosition ? 'bg-white' : 'bg-transparent'} fixed py-2.5 px-5 max-w-screen w-full top-0  z-10`}>
            <nav className='flex items-center'>
                <button className='w-6 h-6' onClick={handleBack}>
                    <FaArrowLeft className='mx-auto my-1 w-4 h-4' />
                </button>
                <div className='ml-[23px] flex justify-center items-center gap-2.5 w-full'>
                    {PaymentStatuses.map((status, i) => (
                        <React.Fragment key={i}>
                            <div
                                className={`${status.pathname === pathname ? 'font-bold' : 'text-txt-foreground'}`}>
                                {status.component}
                            </div>
                            {i < PaymentStatuses.length - 1 && (
                                <GoChevronRight className='text-txt-foreground' />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </nav>
        </header>
    );
}
