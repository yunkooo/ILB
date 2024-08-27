'use client';

import Image from 'next/image';
import PaymentButton from './PaymentButton';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { addMonths, format } from 'date-fns';

export default function PaymentInfo() {
    const [checkState1, setCheckState1] = useState<boolean>(false);
    const [checkState2, setCheckState2] = useState<boolean>(false);
    const [checkState3, setCheckState3] = useState<boolean>(false);

    const formattedDate = format(addMonths(new Date(), 1), 'yyyy.MM.dd');

    return (
        <section>
            <h1 className='pt-7 font-bold text-[28px]'>월간 이용권</h1>
            <h2 className='mt-[26px] font-medium text-[20px]'>
                월 <span className='font-bold'>69,000원</span> 정기결제
            </h2>

            <div className='mt-[54px] border px-5 py-[22px] flex flex-col gap-[22px] rounded-2xl'>
                <div className='flex justify-between'>
                    <p className='font-medium text-[16px] text-txt-foreground'>
                        다음 결제 예정일
                    </p>
                    <p className='font-bold'>{formattedDate}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <div className='flex'>
                        <div className='flex items-center'>
                            <Image
                                src='/logo/logo_toss.svg'
                                height={24}
                                width={24}
                                alt='toss logo'
                            />
                            <p className='mr-1 font-bold align-top text-base'>
                                toss
                            </p>
                        </div>
                        <p className='font-medium text-base text-txt-foreground'>
                            결제 수단
                        </p>
                    </div>
                    <p className='font-bold text-base'>카드 간편 결제</p>
                </div>
            </div>
            <div className='mt-5 flex flex-col gap-[5px]'>
                <div>
                    <Checkbox
                        onClick={() => {
                            setCheckState1(prev => !prev);
                        }}
                        id='agreement-1'
                    />
                    <label
                        htmlFor='agreement-1'
                        className='ml-1.5 text-txt-foreground text-sm font-medium'>
                        (필수) 정기 결제 동의
                    </label>
                </div>
                <div>
                    <Checkbox
                        onClick={() => {
                            setCheckState2(prev => !prev);
                        }}
                        id='agreement-2'
                    />
                    <label
                        htmlFor='agreement-2'
                        className='ml-1.5 text-txt-foreground text-sm font-medium'>
                        (필수) 이용약관 및 결제 유의사항
                    </label>
                </div>
                <div>
                    <Checkbox
                        onClick={() => {
                            setCheckState3(prev => !prev);
                        }}
                        id='agreement-3'
                    />
                    <label
                        htmlFor='agreement-3'
                        className='ml-1.5 text-txt-foreground text-sm font-medium'>
                        (필수) 제3자 개인 정보 제공
                    </label>
                </div>
            </div>
            <PaymentButton
                disabled={checkState1 && checkState2 && checkState3}
            />
        </section>
    );
}
