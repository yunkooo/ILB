'use clent';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BabyInfoData } from './page';
import { useRef } from 'react';

type Props = {
    form: any;
    babyInfoData: BabyInfoData;
    onNext: (babyInfoData?: BabyInfoData) => void;
};

export default function BabyBirth({ form, babyInfoData, onNext }: Props) {
    const birthdayInput = useRef<HTMLInputElement | null>(null);
    return (
        <>
            <h1 className='text-lg text-center font-medium mb-40'>
                아이의 생일을 알려주세요!
            </h1>
            <Label htmlFor='babyBirthday' className='text-base'>
                생년월일
            </Label>
            <Input
                id='babyBirthday'
                className='text-xl border-0 border-b-[1px] rounded-none p-[5px] sborder-txt-foreground mr-28 mt-6 mb-60'
                type='text'
                placeholder='20240407'
                ref={birthdayInput}
            />
            <Button
                type='button'
                className='font-notoSansKr mb-[60px] box-border bottom-0'
                variant={'default'}
                onClick={() => {
                    if (birthdayInput.current?.value) {
                        onNext({
                            ...babyInfoData,
                            birth: birthdayInput.current?.value,
                        });
                    }
                }}>
                다음
            </Button>
        </>
    );
}
