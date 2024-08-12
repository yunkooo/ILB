'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BabyInfoData } from './page';
import { useRef } from 'react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

type Props = {
    form: any;
    babyInfoData: BabyInfoData;
    onNext: (babyInfoData?: BabyInfoData) => void;
};

export default function BabyName({ form, babyInfoData, onNext }: Props) {
    const babyNameInput = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <h1 className='text-lg text-center font-medium'>
                가입을 축하드려요!
            </h1>
            <p className='text-lg text-center font-medium mt-5 mb-24'>
                아이의 닉네임을 입력해주세요
            </p>
            <Label
                htmlFor='babyNickname'
                className='text-base text-txt-foreground'>
                아이 닉네임
            </Label>
            <Input
                className='border-0 border-b-[1px] rounded-none p-[5px] text-xl border-txt-foreground mr-28 mt-6 mb-60'
                type='text'
                placeholder='닉네임을 입력해주세요'
                ref={babyNameInput}
            />
            {/* <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>이름</FormLabel>
                        <FormControl>
                            <Input
                                className='border-0 border-b-[1px] rounded-none p-[5px] text-xl border-txt-foreground mr-28 mt-6 mb-60'
                                type='text'
                                placeholder='닉네임을 입력해주세요'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            /> */}
            <Button
                type='button'
                className='font-notoSansKr mb-[60px] box-border bottom-0'
                variant={'default'}
                onClick={() => {
                    if (babyNameInput.current?.value) {
                        onNext({
                            ...babyInfoData,
                            name: babyNameInput.current?.value,
                        });
                    }
                }}
                // onClick={() => onNext()}
            >
                다음
            </Button>
        </>
    );
}
