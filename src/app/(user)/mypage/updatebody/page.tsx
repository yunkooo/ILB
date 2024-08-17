'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { actionDataFetch } from '@/data/actions/fetchAction';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { UserData } from '@/types';

export default async function UpdateBodyInfo() {
    const session = useSession();
    const userData = session.data;
    const userId = userData?.user.id;
    const accessToken = userData?.accessToken;
    console.log(userData);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            height: '',
            weight: '',
        },
        mode: 'onChange',
    });

    async function onSubmit(formData: { weight: string; height: string }) {
        const formattedDate = format(new Date(), 'yyyyMMdd');

        const babyBodyInfo = {
            grow: [
                ...(userData?.extra.baby.grow || []),
                {
                    weight: formData.weight,
                    height: formData.height,
                    date: formattedDate,
                },
            ],
        };

        try {
            const resData = await actionDataFetch(
                'POST',
                userId,
                accessToken,
                babyBodyInfo,
            );
            if (resData.ok) {
                router.push('/mypage');
            }
        } catch (error: any) {
            // API 서버의 에러 메시지 처리
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    }

    return (
        <section>
            <Image
                src={'/logo_M.svg'}
                alt='ILB'
                width={60}
                height={60}
                className='mb-[18px] mx-auto'
            />
            <h1 className='text-lg text-center font-medium mb-40'>
                아이의 몸무게와 키를 알려주세요!
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                    value: /^\d+(\.\d{1,4})?$/,
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
                                    value: /^\d+(\.\d{1,4})?$/,
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
                <Button
                    type='submit'
                    className='font-notoSansKr my-[60px] box-border bottom-0'
                    variant={'default'}
                    disabled={!isValid}>
                    저장하기
                </Button>
            </form>
        </section>
    );
}
