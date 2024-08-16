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

// 비밀번호 조건 정규표현식
const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$#&*?!%])[A-Za-z\d!@$#%&*?]{8,15}$/;

// zod Form 스키마 (유효성 검사 조건)
const FormSchema = z
    .object({
        name: z
            .string()
            .min(2, { message: '2글자 이상 입력해 주세요.' })
            .max(10, { message: '10글자 이하 입력해 주세요.' }),

        email: z
            .string()
            .email({ message: '이메일을 올바르게 입력해 주세요.' }),

        password: z
            .string()
            .min(8, { message: '8자리 이상 입력해 주세요.' })
            .max(15, { message: '15자리 이하 입력해 주세요.' })
            .regex(passwordRegex, {
                message:
                    '비밀번호는 8~15글자이어야합니다.\n영문, 숫자, 특수문자(~!@#$ %^&*)를 조합해 주세요.',
            }),

        passwordCheck: z
            .string()
            .nonempty({ message: '비밀번호를 재입력해 주세요.' }),

        phone: z
            .string()
            .length(11, { message: '핸드폰 번호는 11자리여야 합니다.' })
            .regex(/^010/, {
                message: "핸드폰 번호는 '010'으로 시작해야 합니다.",
            })
            .refine(value => !isNaN(Number(value)), {
                message: '핸드폰 번호는 숫자 형식이어야 합니다.',
            }),

        type: z.literal('user'),
    })

    .refine(data => data.password === data.passwordCheck, {
        path: ['passwordCheck'],
        message: '비밀번호가 일치하지 않습니다.',
    });

export default function EditProfile() {
    const router = useRouter();

    const session = useSession();
    const userData = session.data;
    const status = session.status;
    const userId = userData?.user.id;
    const accessToken = userData?.accessToken;

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordCheck: '',
            phone: '',
            type: 'user',
        },
    });

    //& 수정하기 버튼 클릭 이벤트
    async function editProfile(formData: z.infer<typeof FormSchema>) {
        const { passwordCheck, ...filteredData } = formData;

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
            } else if ('errors' in error) {
                error.errors.forEach((error: any) =>
                    form.setError(error.path, { message: error.msg }),
                );
            }
        }
    }

    // 회원 정보 불러오기
    useEffect(() => {
        async function getUserData(data: z.infer<typeof FormSchema>) {
            if (userData) {
                try {
                    const resData = await actionDataFetch(
                        'GET',
                        userId,
                        accessToken,
                    );
                    form.setValue('name', resData.item.name);
                    form.setValue('email', resData.item.email);
                    form.setValue('phone', resData.item.phone);
                } catch (error) {
                    console.error(error);
                }
            }
        }

        if (status !== 'loading') {
            getUserData(form.getValues());
        }
    }, [session, status, form.setValue]);

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
                <form
                    onSubmit={form.handleSubmit(editProfile)}
                    className='w-full'>
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
