'use clent';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useFormContext } from 'react-hook-form';

type Props = {
    onNext: () => void;
};

export default function BabyBirth({ onNext }: Props) {
    const {
        register,
        formState: { errors, isValid },
    } = useFormContext();
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
                {...register('birth', {
                    required: true,
                    pattern: {
                        value: /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/,
                        message: '올바른 형식이 아닙니다.',
                    },
                })}
            />
            {errors.birth && (
                <p className='text-red-500'>
                    {errors.birth.message?.toString()}
                </p>
            )}
            <Button
                type='button'
                className='font-notoSansKr mb-[60px] box-border bottom-0'
                variant={'default'}
                onClick={() => onNext()}
                disabled={!isValid}>
                다음
            </Button>
        </>
    );
}
