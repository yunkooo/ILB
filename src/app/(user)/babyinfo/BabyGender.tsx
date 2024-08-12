'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { BabyInfoData, Gender } from './page';

type Props = {
    form: any;
    babyInfoData: BabyInfoData;
    onNext: (babyInfoData?: BabyInfoData) => void;
};
export default function BabyGender({ form, babyInfoData, onNext }: Props) {
    const [selectedGender, setSelectedGender] = useState<Gender>('man');

    const handleButtonClick = (gender: Gender) => {
        setSelectedGender(gender);
    };

    return (
        <>
            <h1 className='text-lg text-center font-medium mb-40'>
                아이의 성별을 알려주세요!
            </h1>
            <article className='mb-60'>
                <div className='flex items-center gap-8'>
                    <Button
                        className={`text-txt mx-auto hover:bg-primary-foreground ${selectedGender === 'man' ? 'bg-primary-foreground' : ''}`}
                        type='button'
                        variant={'outline'}
                        size={'md'}
                        fontWeight={'sm'}
                        onClick={() => handleButtonClick('man')}>
                        남자
                    </Button>
                    <Button
                        className={`text-txt mx-auto hover:bg-primary-foreground ${selectedGender === 'girl' ? 'bg-primary-foreground' : ''}`}
                        type='button'
                        variant={'outline'}
                        size={'md'}
                        fontWeight={'sm'}
                        onClick={() => handleButtonClick('girl')}>
                        여자
                    </Button>
                </div>
                <Button
                    type='button'
                    className='font-notoSansKr mb-[60px] box-border bottom-0'
                    variant={'default'}
                    onClick={() =>
                        onNext({
                            ...babyInfoData,
                            gender: selectedGender,
                        })
                    }>
                    다음
                </Button>
            </article>
        </>
    );
}
