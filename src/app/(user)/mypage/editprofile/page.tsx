'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { actionDataFetch } from '@/data/actions/fetchAction';
import { UserData, UserSignUpForm } from '@/types';

// 비밀번호 조건 정규표현식
const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$#&*?!%])[A-Za-z\d!@$#%&*?]{8,15}$/;

export default function EditProfile() {
    const router = useRouter();

    const session = useSession();
    const userData = session.data;
    const status = session.status;
    const userId = userData?.user.id;
    const accessToken = userData?.accessToken;

    const form = useForm<UserSignUpForm>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordCheck: '',
            phone: '',
        },
    });

    const {
        formState: { isValid },
    } = form;

    //& 수정하기 버튼 클릭 이벤트
    async function onSubmit(formData: UserSignUpForm) {
        console.log(formData);

        //passwordCheck 데이터 제외를 위한 객체복사
        const { password, passwordCheck, ...filteredData } = formData;

        const remakeData = {
            ...filteredData,
        };

        try {
            // API 통신
            const resData = await actionDataFetch(
                'PATCH',
                userId,
                accessToken,
                filteredData,
            );

            if (resData.ok) {
                localStorage.setItem(
                    'toastMessage',
                    '회원정보 수정이 완료되었습니다.',
                );
                router.push('/mypage');
                toast({
                    title: '회원정보 수정이 완료되었습니다.',
                    duration: 3000,
                });
            }
        } catch (error: any) {
            // API 서버의 에러 메시지 처리
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    }

    useEffect(() => {
        if (userData) {
            actionDataFetch('GET', userId, accessToken)
                .then(resData => {
                    form.setValue('name', resData.item.name);
                    form.setValue('email', resData.item.email);
                    form.setValue('phone', resData.item.phone);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [session, status]);

    const isFormValid =
        form.watch().name && form.watch().email && form.watch().phone;

    return (
        <section>
            <Image
                src={'/logo_M.svg'}
                alt='ILB'
                width={60}
                height={60}
                className='mb-2 mx-auto'
            />
            <h1 className='text-center mb-[34px] font-bold'>내 정보 수정</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem className='mb-8'>
                                <FormLabel className='text-txt-foreground'>
                                    이름
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className='border-0 border-b-[1px] rounded-none p-[5px] text-[12px] border-txt-foreground'
                                        type='text'
                                        placeholder='이름을 입력해주세요'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='--destructive' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className='mb-8'>
                                <FormLabel className='text-txt-foreground'>
                                    이메일
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className='border-0 border-b-[1px] rounded-none p-[5px] text-[12px] border-txt-foreground'
                                        type='email'
                                        placeholder='이메일을 입력해주세요'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='--destructive' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem className='mb-8'>
                                <FormLabel className='text-txt-foreground'>
                                    비밀번호
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className='border-0 border-b-[1px] rounded-none p-[5px] text-[12px] border-txt-foreground'
                                        type='password'
                                        placeholder='비밀번호를 입력해주세요'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='passwordCheck'
                        render={({ field }) => (
                            <FormItem className='mb-8'>
                                <FormLabel className='text-txt-foreground'>
                                    비밀번호 확인
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className='border-0 border-b-[1px] rounded-none p-[5px] text-[12px] border-txt-foreground'
                                        type='password'
                                        placeholder='비밀번호를 한번 더 입력해주세요'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='phone'
                        render={({ field }) => (
                            <FormItem className='mb-8'>
                                <FormLabel className='text-txt-foreground'>
                                    휴대폰 번호
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className='border-0 border-b-[1px] rounded-none p-[5px] text-[12px] border-txt-foreground'
                                        type='text'
                                        placeholder='휴대폰 번호를 입력해주세요'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type='submit'
                        className={`${!isFormValid ? 'bg-gray-400' : ''}`}
                        disabled={!isFormValid}>
                        수정하기
                    </Button>
                </form>
            </Form>
        </section>
    );
}
