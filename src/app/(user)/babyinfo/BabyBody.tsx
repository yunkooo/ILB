'use client';

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

export default function BabyBody({ form, babyInfoData, onNext }: Props) {
    const heightInput = useRef<HTMLInputElement | null>(null);
    const weightInput = useRef<HTMLInputElement | null>(null);
    return (
        <>
            <h1 className='text-lg text-center font-medium mb-40'>
                아이의 몸무게와 키를 알려주세요!
            </h1>
            <div className='flex justify-between gap-6 mb-60'>
                <article className='flex items-end'>
                    <Input
                        id='babyHeight'
                        className='border-0 border-b-[1px] rounded-none p-[5px] text-xl border-txt-foreground font-light placeholder:text-lg'
                        type='text'
                        placeholder='키'
                        ref={heightInput}
                    />
                    <Label htmlFor='babyHeight' className='text-xl'>
                        cm
                    </Label>
                </article>
                <article className='flex items-end'>
                    <Input
                        id='babyWeight'
                        className='border-0 border-b-[1px] rounded-none text-xl p-[5px] border-txt-foreground font-light placeholder:text-lg'
                        type='text'
                        placeholder='몸무게'
                        ref={weightInput}
                    />
                    <Label htmlFor='babyWeight' className='text-xl'>
                        kg
                    </Label>
                </article>
            </div>
            <Button
                type='submit'
                className='font-notoSansKr mb-[60px] box-border bottom-0'
                variant={'default'}
                onClick={() => {
                    if (
                        heightInput.current?.value &&
                        weightInput.current?.value
                    ) {
                        onNext({
                            ...babyInfoData,
                            grow: [
                                ...babyInfoData.grow,
                                {
                                    weight: parseInt(
                                        weightInput.current?.value,
                                    ),
                                    height: parseInt(
                                        heightInput.current?.value,
                                    ),
                                    date: '20240101',
                                },
                            ],
                        });
                    }
                }}>
                다음
            </Button>
        </>
    );
}
