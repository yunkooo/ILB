'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useFormContext } from 'react-hook-form';

export default function BabyBody() {
    const {
        register,
        formState: { errors },
    } = useFormContext();

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
                        {...register('height', {
                            required: true,
                            pattern: {
                                value: /^\d+$/,
                                message: '올바른 형식이 아닙니다.',
                            },
                        })}
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
                        {...register('weight', {
                            required: true,
                            pattern: {
                                value: /^\d+$/,
                                message: '올바른 형식이 아닙니다.',
                            },
                        })}
                    />
                    <Label htmlFor='babyWeight' className='text-xl'>
                        kg
                    </Label>
                </article>
            </div>
            {errors.weight && (
                <p className='text-red-500'>
                    {errors.weight.message?.toString()}
                </p>
            )}
            {errors.height && (
                <p className='text-red-500'>
                    {errors.height.message?.toString()}
                </p>
            )}
        </>
    );
}
