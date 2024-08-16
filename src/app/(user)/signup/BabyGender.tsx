'use client';

import { Button } from '@/components/ui/button';
import { Gender } from '@/types/baby';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function BabyGender() {
    const [selectedGender, setSelectedGender] = useState<Gender>('man');

    const handleButtonClick = (gender: Gender) => {
        setSelectedGender(gender);
    };
    const { setValue } = useFormContext();

    useEffect(() => {
        setValue('gender', selectedGender);
    }, [selectedGender]);

    return (
        <>
            <h1 className='text-lg text-center font-medium mb-[15vh]'>
                아이의 성별을 알려주세요!
            </h1>
            <article>
                <div className='flex items-center gap-8'>
                    <Button
                        className={`text-txt mx-auto hover:bg-primary-foreground ${selectedGender === 'man' ? 'bg-primary-foreground font-bold' : ''}`}
                        type='button'
                        variant={'outline'}
                        size={'md'}
                        fontWeight={'sm'}
                        onClick={() => handleButtonClick('man')}>
                        남자
                    </Button>
                    <Button
                        className={`text-txt mx-auto hover:bg-primary-foreground ${selectedGender === 'girl' ? 'bg-primary-foreground font-bold' : ''}`}
                        type='button'
                        variant={'outline'}
                        size={'md'}
                        fontWeight={'sm'}
                        onClick={() => handleButtonClick('girl')}>
                        여자
                    </Button>
                </div>
            </article>
        </>
    );
}
