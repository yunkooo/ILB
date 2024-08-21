'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { emailCheck, signup } from '@/data/actions/userAction';
import Funnel from '@/lib/funnel/Funnel';
import useFunnel from '@/lib/funnel/useFunnel';
import { UserSignUpForm } from '@/types';
import { format } from 'date-fns';
import _ from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BabyBirth from './(baby)/BabyBirth';
import BabyBody from './(baby)/BabyBody';
import BabyGender from './(baby)/BabyGender';
import BabyName from './(baby)/BabyName';
import SignupForm from './(user)/SignupForm';

const steps = ['usersignup', 'babyname', 'babygender', 'babybirth', 'babybody'];

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
        // 버튼이 'submit'이지만 마지막 BabyBody step에서만 전송이 가능하다.
        // 나머지는 다음 페이지로 넘어가는 버튼으로 작동
        if (step !== 'babybody') return;

        const formattedDate = format(new Date(), 'yyyyMMdd');

        try {
            //passwordCheck 데이터를 제외를 위한 객체복사
            const {
                passwordCheck,
                babyName,
                birth,
                height,
                weight,
                gender,
                ...filteredData
            } = formData;

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

            const resData = await signup(remakeData);

            if (resData.ok) {
                localStorage.setItem(
                    'toastMessage',
                    `회원가입 성공! 반갑습니다 ${formData.name}님`,
                );

                router.replace('/login');
            } else {
                // API 서버의 에러 메시지 처리
                if ('errors' in resData) {
                    resData.errors.forEach((error: any) =>
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
                src={'/logo_M.svg'}
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
                className={`font-notoSansKr fixed bottom-[2.5vh] box-border ${!isValid || isEmailDuplicate ? 'bg-gray-400' : ''}`}
                variant={'default'}
                disabled={!isValid || isEmailDuplicate}
                onClick={onNextStep}>
                다음
            </Button>
        </section>
    );
}
