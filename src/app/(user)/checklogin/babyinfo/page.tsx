'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import Funnel from '@/lib/funnel/Funnel';
import useFunnel from '@/lib/funnel/useFunnel';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { BabyInputForm, ResError } from '@/types';
import BabyName from '../../signup/(baby)/BabyName';
import BabyGender from '../../signup/(baby)/BabyGender';
import BabyBirth from '../../signup/(baby)/BabyBirth';
import BabyBody from '../../signup/(baby)/BabyBody';
import BabyProfile from '../../signup/(baby)/BabyProfile';

interface RemakeData {
    attach?: string;
    profileImage?: string;
    extra: {
        providerAccountId: string | null | undefined;
        baby: {
            name: string;
            gender: 'boy' | 'girl';
            birth: string;
            grow: {
                weight: string;
                height: string;
                date: string;
            }[];
        };
        subscribe: {
            status: string;
            date: string;
        };
    };
}

const steps = [
    'BabyName',
    'BabyGender',
    'BabyBirth',
    'BabyProfile',
    'BabyBody',
];

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export default function BabyInfo() {
    const router = useRouter();
    const session = useSession();
    const userData = session.data;
    const userId = userData?.user.id;
    const accessToken = userData?.accessToken;
    const providerAccountId = userData?.user.extra.providerAccountId;

    const { step, onNextStep } = useFunnel({ steps });

    const form = useForm<BabyInputForm>({
        defaultValues: {
            babyName: '',
            birth: '',
            height: '',
            weight: '',
            attach: '',
            gender: 'boy',
        },
        mode: 'onChange',
    });
    const {
        formState: { isValid },
    } = form;

    // 회원가입시 formData 전송
    async function onSubmit(formData: BabyInputForm) {
        const userData = new FormData();

        // 버튼이 'submit'이지만 마지막 BabyBody step에서만 전송이 가능하다.
        // 나머지는 다음 페이지로 넘어가는 버튼으로 작동
        if (step !== 'BabyBody') return;

        const formattedDate = format(new Date(), 'yyyyMMdd');

        try {
            // passwordCheck 데이터를 제외를 위한 객체복사
            const { babyName, birth, height, weight, gender, attach } =
                formData;

            const remakeData: RemakeData = {
                attach,
                extra: {
                    providerAccountId,
                    baby: {
                        name: babyName,
                        gender,
                        birth,
                        grow: [
                            {
                                weight,
                                height,
                                date: formattedDate,
                            },
                        ],
                    },
                    subscribe: {
                        status: 'false',
                        date: '',
                    },
                },
            };

            //# const resData = await actionDataFetch(
            //     'PATCH',
            //     userId,
            //     accessToken,
            //     remakeData,
            // );

            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'attach') {
                    userData.append(key, value as string);
                }
            });
            if (formData.attach) {
                console.log('여기 잡히냐?');
                userData.append('attach', formData.attach[0]);
            }

            // 이미지 업로드
            if (
                remakeData.attach !== undefined &&
                remakeData.attach.length > 0
            ) {
                const body = new FormData();
                console.log('remakeData.attach[0]', remakeData.attach[0]);
                body.append('attach', remakeData.attach[0]);
                console.log('body', body);
                const fileRes = await fetch(`${SERVER}/files`, {
                    method: 'POST',
                    headers: {
                        'client-id': '05-ILB',
                    },
                    body,
                });

                const resJson = await fileRes.json();

                if (!resJson.ok) {
                    throw new Error('파일 업로드 실패.');
                }

                remakeData.profileImage = resJson.item[0].path;
            }
            delete remakeData.attach;

            //# const resData = await actionDataFetch(
            //     'PATCH',
            //     userId,
            //     accessToken,
            //     remakeData,
            // );

            // 소셜 회원 가입
            const res = await fetch(`${SERVER}/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'client-id': '05-ILB',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(remakeData),
            });

            const resData = await res.json();

            if (resData.ok) {
                localStorage.setItem(
                    'toastMessage',
                    `ILB의 회원가입을 환영합니다.`,
                );
                router.push('/');
            } else {
                // API 서버의 에러 메시지 처리
                if ('errors' in resData) {
                    resData.errors.forEach((error: ResError<BabyInputForm>) =>
                        form.setError(error.path, { message: error.msg }),
                    );
                } else if (resData.message) {
                    alert(resData.message);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section>
            <Image
                src='/logo/logo_M.svg'
                alt='ILB'
                width={60}
                height={60}
                className='mb-2 mx-auto'
            />
            <div className='h-[60vh] custom-scrollbar'>
                <Form {...form}>
                    <form
                        id='signup-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-full'>
                        <Funnel step={step}>
                            <Funnel.Step name='BabyName'>
                                <BabyName />
                            </Funnel.Step>
                            <Funnel.Step name='BabyGender'>
                                <BabyGender />
                            </Funnel.Step>
                            <Funnel.Step name='BabyBirth'>
                                <BabyBirth />
                            </Funnel.Step>
                            <Funnel.Step name='BabyProfile'>
                                <BabyProfile />
                            </Funnel.Step>
                            <Funnel.Step name='BabyBody'>
                                <BabyBody />
                            </Funnel.Step>
                        </Funnel>
                    </form>
                </Form>
            </div>
            <Button
                form='signup-form'
                type='submit'
                className={`fixed mb-[60px] ${!isValid ? 'bg-gray-400' : ''}`}
                variant='default'
                size='fixed'
                disabled={!isValid}
                onClick={onNextStep}>
                다음
            </Button>
        </section>
    );
}
