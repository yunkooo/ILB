'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { emailCheck } from '@/data/actions/userAction';
import Funnel from '@/lib/funnel/Funnel';
import useFunnel from '@/lib/funnel/useFunnel';
import { ResError, UserSignUpForm } from '@/types';
import { format } from 'date-fns';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BabyBirth from './(baby)/BabyBirth';
import BabyBody from './(baby)/BabyBody';
import BabyGender from './(baby)/BabyGender';
import BabyName from './(baby)/BabyName';
import SignupForm from './(user)/SignupForm';
import BabyProfile from './(baby)/BabyProfile';

const steps = [
    'usersignup',
    'babyname',
    'babygender',
    'babybirth',
    'babyprofile',
    'babybody',
];

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export default function Signup() {
    const router = useRouter();
    const [isEmailDuplicate, setIsEmailDuplicate] = useState(false); // 중복 검사 상태
    const { step, onNextStep } = useFunnel({ steps });

    const form = useForm<UserSignUpForm>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordCheck: '',
            phone: '',
            zoneCode: '',
            roadAddress: '',
            detailAddress: '',
            type: 'user',
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
        setError,
        clearErrors,
    } = form;

    const email = form.watch('email');

    useEffect(() => {
        const emailPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,4}$/;

        clearErrors('email');

        const checkEmail = _.debounce(async () => {
            if (emailPattern.test(email)) {
                const res = await emailCheck(email);

                // res.ok 가 1이면 중복되지 않음
                // res.ok 가 0이면 중복됨
                if (res.ok || res.errors) {
                    clearErrors('email');
                    setIsEmailDuplicate(false); // 중복 상태 업데이트
                } else {
                    setError('email', {
                        type: 'manual',
                        message: '이미 등록된 이메일입니다.',
                    });
                    setIsEmailDuplicate(true); // 중복 상태 업데이트
                }
            }
        }, 300);

        checkEmail();

        return () => {
            checkEmail.cancel(); // 이전 호출을 취소
        };
    }, [email, setError, clearErrors]);

    // 회원가입시 formData 전송
    async function onSubmit(formData: UserSignUpForm) {
        const userData = new FormData();

        // 버튼이 'submit'이지만 마지막 BabyBody step에서만 전송이 가능하다.
        // 나머지는 다음 페이지로 넘어가는 버튼으로 작동
        if (step !== 'babybody') return;

        const formattedDate = format(new Date(), 'yyyyMMdd');

        try {
            // passwordCheck 데이터를 제외를 위한 객체복사
            const {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                passwordCheck,
                babyName,
                birth,
                height,
                weight,
                gender,
                ...filteredData
            } = formData;

            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'attach') {
                    userData.append(key, value as string);
                }
            });
            if (formData.attach) {
                userData.append('attach', formData.attach[0]);
            }

            const remakeData = {
                ...filteredData,
                extra: {
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

            //# const resData = await signup(remakeData);

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

            // 회원 가입
            const res = await fetch(`${SERVER}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'client-id': '05-ILB',
                },
                body: JSON.stringify(remakeData),
            });

            const resData = await res.json();
            // return resData;

            if (resData.ok) {
                localStorage.setItem(
                    'toastMessage',
                    `회원가입 성공! 반갑습니다 ${formData.name}님`,
                );

                router.replace('/login');
            } else {
                // API 서버의 에러 메시지 처리
                if ('errors' in resData) {
                    resData.errors.forEach((error: ResError<UserSignUpForm>) =>
                        form.setError(error.path, {
                            message: error.msg,
                        }),
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
            <h1 className='text-center mb-[2vh] font-bold'>회원가입</h1>
            <div className='h-[50vh] custom-scrollbar'>
                <Form {...form}>
                    <form
                        id='signup-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-full'>
                        <Funnel step={step}>
                            <Funnel.Step name='usersignup'>
                                <SignupForm />
                            </Funnel.Step>
                            <Funnel.Step name='babyname'>
                                <BabyName />
                            </Funnel.Step>
                            <Funnel.Step name='babygender'>
                                <BabyGender />
                            </Funnel.Step>
                            <Funnel.Step name='babybirth'>
                                <BabyBirth />
                            </Funnel.Step>
                            <Funnel.Step name='babyprofile'>
                                <BabyProfile />
                            </Funnel.Step>
                            <Funnel.Step name='babybody'>
                                <BabyBody />
                            </Funnel.Step>
                        </Funnel>
                    </form>
                </Form>
            </div>
            <Button
                form='signup-form'
                type='submit'
                className={`fixed bottom-[60px] ${!isValid || isEmailDuplicate ? 'bg-gray-400' : ''}`}
                variant='default'
                size='fixed'
                disabled={!isValid || isEmailDuplicate}
                onClick={onNextStep}>
                다음
            </Button>
        </section>
    );
}
