import React from 'react';
import DeliveryStatusItems from './DeliveryStatusItems';

export default function DeliveryCard() {
    return (
        <>
            <div className='flex justify-between items-end mb-4 text-sm'>
                <span className='font-bold'>배송 현황</span>
            </div>
            <DeliveryStatusItems bgColor='bg-card' />
        </>
    );
}
