'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function NotSubscriber() {
    const router = useRouter();

    const handleOnClick = () => {
        router.push('/order');
    };

    return (
        <>
            <Image
                src='/baby/baby_1.svg'
                alt='baby_img'
                width={100}
                height={100}
                className='mx-auto'
            />
            <div className='mt-16 text-center text-lg'>
                <h2 className='mb-9 font-bold text-3xl'>
                    아직 구독하지 않으셨네요!
                </h2>
                <p className='mb-3'>
                    우리 아이의 발달 단계에 맞춘 맞춤형 패키지,
                </p>
                <p> 매달 집에서 만나보시겠어요?</p>
            </div>
            <Button
                type='button'
                className='fixed bottom-[60px]'
                variant='default'
                size='fixed'
                onClick={handleOnClick}>
                구독하러가기
            </Button>
        </>
    );
}
