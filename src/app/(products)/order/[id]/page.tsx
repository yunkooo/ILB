'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckBabyInfo from './CheckBabyInfo';
import DeliveryInfo from './Delivery';
import PaymentInfo from './Payment';
import { Button } from '@/components/ui/button';
import SelectMonth from './SelectMonth';
import PaymentButton from './PaymentButton';

interface PageComponent {
    id: string;
    component: React.ReactNode;
}

const pageComponent: PageComponent[] = [
    { id: '1', component: <CheckBabyInfo /> },
    { id: '1.5', component: <SelectMonth /> },
    { id: '2', component: <DeliveryInfo /> },
    { id: '3', component: <PaymentInfo /> },
];

export default function OrderPage({ params }: { params: { id: string } }) {
    const paramsNum = parseInt(params.id);
    const [pageNum, setPageNum] = useState(paramsNum + 1 || 1);
    const route = useRouter();

    const handleNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let nextPage = pageNum + 1;

        //% /order/1 페이지에서 선택한 버튼에 따른 route 설정해야 함.
        if (params.id === '1.5') {
            route.push('/order/2');
        } else {
            setPageNum(nextPage);
            route.push(`/order/${pageNum}`);
        }
    };

    const content = pageComponent.find(page => parseInt(page.id) === paramsNum);

    return (
        <>
            {content?.component}
            {/* /page/3 결제 페이지에서는 결제 버튼 컴포넌트
                다른페이지에서는 다음 버튼
            */}
            {/* {params.id === '3' ? (
                <PaymentButton />
            ) : (
                <Button
                    className='mt-60 mb-[60px] font-notoSansKr'
                    variant={'default'}
                    onClick={handleNextPage}>
                    다음
                </Button>
            )} */}
        </>
    );
}
