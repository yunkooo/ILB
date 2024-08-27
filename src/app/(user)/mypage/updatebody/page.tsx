'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { actionBabyBodyInfo } from '@/data/actions/babyAction';
import { BabyBody, ResError } from '@/types';
import { useState } from 'react';

export default function UpdateBodyInfo() {
    const router = useRouter();
    const [throttle, setThrottle] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm<BabyBody>({
        defaultValues: {
            height: '',
            weight: '',
        },
        mode: 'onChange',
    });

    async function onSubmit(formData: BabyBody) {
        if (throttle) return; // 이미 throttle 중이면 바로 리턴

        setThrottle(true); // throttle 활성화
        setTimeout(() => setThrottle(false), 2000); // 2초 후에 throttle 해제
        try {
            const resData = await actionBabyBodyInfo(formData);

            if (resData.ok) {
                router.push('/mypage');
            } else {
                // API 서버의 에러 메시지 처리
                if ('errors' in resData) {
                    resData.errors.forEach((error: ResError<BabyBody>) =>
                        setError(error.path, { message: error.msg }),
                    );
                } else if (resData.message) {
                    alert(resData.message);
                }
            }
        } catch (error) {
            // 네트워크 오류 또는 기타 예외 처리
            if (error instanceof Error) {
                alert(`API 호출 중 오류가 발생했습니다: ${error.message}`);
            } else {
                alert('알 수 없는 오류가 발생했습니다.');
            }
        }

        // 아이 신체 정보 저장
    }

    return (
        <section>
            <Image
                src='/logo/logo_M.svg'
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
                    className='my-[60px] bottom-0'
                    variant='default'
                    disabled={!isValid}>
                    저장하기
                </Button>
            </form>
        </section>
    );
}
