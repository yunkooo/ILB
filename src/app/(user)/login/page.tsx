'use client';

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
import {
    signInWithCredentials,
    signInWithGoogle,
    signInWithKakao,
    signInWithNaver,
} from '@/data/actions/authAction';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// 비밀번호 조건 정규표현식
const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$#&*?!%])[A-Za-z\d!@$#%&*?]{8,15}$/;

const FormSchema = z.object({
    email: z.string().email({ message: '이메일을 올바르게 입력해 주세요.' }),

    password: z
        .string()
        .min(8, { message: '8자리 이상 입력해 주세요.' })
        .max(15, { message: '15자리 이하 입력해 주세요.' })
        .regex(passwordRegex, {
            message: '영문, 숫자, 특수문자(~!@#$%^&*)를 모두 조합해 주세요.',
        }),
});

export default function Login() {
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    useEffect(() => {
        const handlePopState = () => {
            router.replace('/');
        };

        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [router]);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        const res = await signInWithCredentials(formData);

        if (res) {
            if (res.ok === 0) {
                toast({
                    title: `로그인 실패`,
                    description: (
                        <pre className='mt-2 rounded-md p-4 bg-slate-900 text-white'>
                            {res.message}
                        </pre>
                    ),
                    duration: 1000,
                });
            } else {
                localStorage.setItem('toastMessage', `로그인이 되었습니다.`);
                router.push('/');
            }
        } else {
            router.push('/');
        }
    }

    return (
        <section>
            <Image
                src='/logo_M.svg'
                alt='ILB'
                width={60}
                height={60}
                className='mb-2 mx-auto'
            />
            <h1 className='text-center mb-[34px] font-bold'>로그인</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className='mb-8'>
                                <FormLabel>이메일</FormLabel>
                                <FormControl>
                                    <Input
                                        className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground'
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
                            <FormItem>
                                <FormLabel>비밀번호</FormLabel>
                                <FormControl>
                                    <Input
                                        className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground'
                                        type='password'
                                        placeholder='비밀번호를 입력해주세요'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type='submit'
                        className='font-notoSansKr mt-[60px] box-border'>
                        로그인
                    </Button>
                </form>
            </Form>
            <p className='text-txt-foreground text-center mt-[18px] text-xs'>
                아직 회원이 아니신가요?{' '}
                <Link href='/signup' className='text-txt font-normal'>
                    회원가입
                </Link>
            </p>
            <div className='flex items-center mb-10 mt-[60px]'>
                <p className='flex grow h-[1px] bg-txt-foreground' />
                <span className='px-[13px] text-xs font-light text-txt-foreground'>
                    소셜 로그인
                </span>
                <p className='flex grow h-[1px] bg-txt-foreground' />
            </div>
            <form
                action={signInWithCredentials}
                className='flex justify-between px-6 mb-14'>
                <Button
                    type='submit'
                    className='bg-white'
                    size='xs'
                    formAction={signInWithKakao}>
                    <Image
                        src='/icon/icon_kakao.svg'
                        alt='카카오톡 로그인'
                        width={60}
                        height={60}
                    />
                </Button>
                <Button
                    type='submit'
                    className='bg-white'
                    size='xs'
                    formAction={signInWithGoogle}>
                    <Image
                        src='/icon/icon_google.svg'
                        alt='구글 로그인'
                        width={60}
                        height={60}
                    />
                </Button>
                <Button
                    type='submit'
                    className='bg-white'
                    size='xs'
                    formAction={signInWithNaver}>
                    <Image
                        src='/icon/icon_naver.svg'
                        alt='네이버 로그인'
                        width={60}
                        height={60}
                    />
                </Button>
            </form>
        </section>
    );
}
