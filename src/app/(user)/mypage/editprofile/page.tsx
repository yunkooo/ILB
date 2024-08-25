'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { FilteredForm, UserEdit } from '@/types';
import {
    actionUserData,
    actionUserDataModify,
} from '@/data/actions/userAction';
import { TargetArea } from '@/components/Spinner';
import EditForm from './EditForm';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

async function fetchUserData() {
    const { item: userData } = await actionUserData();
    return userData;
}

export default function EditProfile() {
    const router = useRouter();

    const { isPending, data: userData } = useQuery({
        queryKey: ['userData'],
        queryFn: fetchUserData,
    });
    const form = useForm<UserEdit>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordCheck: '',
            phone: '',
        },
        mode: 'onChange',
    });

    const {
        setValue,
        formState: { isValid },
    } = form;

    useEffect(() => {
        if (userData) {
            setValue('name', userData.name);
            setValue('phone', userData.phone);
            setValue('email', userData.email);
        }
    }, [userData, setValue]);

    async function onSubmit(formData: FilteredForm) {
        // passwordCheck 데이터 제외를 위한 객체복사

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordCheck, ...filteredData } = formData;

        try {
            // API 통신
            const resData = await actionUserDataModify(filteredData);

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
        } catch (error) {
            // API 서버의 에러 메시지 처리
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    }

    return (
        <section>
            {isPending ? (
                <TargetArea />
            ) : (
                <>
                    <Image
                        src='/logo_M.svg'
                        alt='ILB'
                        width={60}
                        height={60}
                        className='mb-2 mx-auto'
                    />
                    <h1 className='text-center mb-[2vh] font-bold'>
                        내 정보 수정
                    </h1>
                    <div className='h-[50vh] custom-scrollbar'>
                        <Form {...form}>
                            <form
                                id='userDataEdit-form'
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='w-full'>
                                <EditForm userData={userData} />
                            </form>
                        </Form>
                    </div>
                    <Button
                        form='userDataEdit-form'
                        type='submit'
                        className={`fixed mt-5 bottom-[60px] ${!isValid ? 'bg-gray-400' : ''}`}
                        variant='default'
                        size='fixed'
                        disabled={!isValid}>
                        수정하기
                    </Button>
                </>
            )}
        </section>
    );
}
