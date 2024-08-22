'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { UserEdit } from '@/types';
import EditForm from './EditForm';
import {
    actionUserData,
    actionUserDataModify,
} from '@/data/actions/userAction';
import { TargetArea } from '@/components/Spinner';

export default function EditProfile() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

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
        async function fetchUserData() {
            try {
                const { item: userData } = await actionUserData();
                setValue('name', userData.name);
                setValue('phone', userData.phone);
                setValue('email', userData.email);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, [setValue]);

    //& 수정하기 버튼 클릭 이벤트
    async function onSubmit(formData: UserEdit) {
        //passwordCheck 데이터 제외를 위한 객체복사
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
        } catch (error: any) {
            // API 서버의 에러 메시지 처리
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    }

    return (
        <section>
            {loading ? (
                <>
                    <Image
                        src={'/logo_M.svg'}
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
                                <EditForm />
                            </form>
                        </Form>
                    </div>
                    <Button
                        form='userDataEdit-form'
                        type='submit'
                        className={`font-notoSansKr fixed mt-5 bottom-[60px] box-border ${!isValid ? 'bg-gray-400' : ''}`}
                        variant={'default'}
                        size={'fixed'}
                        disabled={!isValid}>
                        수정하기
                    </Button>
                </>
            ) : (
                <TargetArea />
            )}
        </section>
    );
}
