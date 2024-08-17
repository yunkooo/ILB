'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { actionDataFetch } from '@/data/actions/fetchAction';
import { UserSignUpForm } from '@/types';
import EditForm from './EditForm';

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

    //& 수정하기 버튼 클릭 이벤트
    async function onSubmit(formData: UserSignUpForm) {
        //passwordCheck 데이터 제외를 위한 객체복사
        const {
            passwordCheck,
            babyName,
            birth,
            height,
            weight,
            gender,
            ...filteredData
        } = formData;

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
                    <EditForm />
                    <Button
                        type='submit'
                        className={`font-notoSansKr fixed bottom-[2.5vh] box-border ${!isValid ? 'bg-gray-400' : ''}`}
                        variant={'default'}
                        disabled={!isValid}>
                        수정하기
                    </Button>
                </form>
            </Form>
        </section>
    );
}
