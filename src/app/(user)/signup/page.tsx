'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import Funnel from '@/lib/funnel/Funnel';
import useFunnel from '@/lib/funnel/useFunnel';
import SignupForm from './(user)/SignupForm';
import { signup } from '@/data/actions/userAction';
import { Button } from '@/components/ui/button';
import { UserSignUpForm } from '@/types';
import BabyName from './(baby)/BabyName';
import BabyGender from './(baby)/BabyGender';
import BabyBirth from './(baby)/BabyBirth';
import BabyBody from './(baby)/BabyBody';

const steps = ['userSignup', 'BabyName', 'BabyGender', 'BabyBirth', 'BabyBody'];

export default function Signup() {
    const router = useRouter();

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
    } = form;

    // 회원가입시 formData 전송
    async function onSubmit(formData: UserSignUpForm) {
        // 버튼이 'submit'이지만 마지막 BabyBody step에서만 전송이 가능하다.
        // 나머지는 다음 페이지로 넘어가는 버튼으로 작동
        if (step !== 'BabyBody') return;

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
                router.push('/login');
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
            <div className='overflow-auto h-[60vh]'>
                <Form {...form}>
                    <form
                        id='signup-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-full'>
                        <Funnel step={step}>
                            <Funnel.Step name='userSignup'>
                                <SignupForm />
                            </Funnel.Step>
                            <Funnel.Step name='BabyName'>
                                <BabyName />
                            </Funnel.Step>
                            <Funnel.Step name='BabyGender'>
                                <BabyGender />
                            </Funnel.Step>
                            <Funnel.Step name='BabyBirth'>
                                <BabyBirth />
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
                className={`font-notoSansKr fixed bottom-[2.5vh] box-border ${!isValid ? 'bg-gray-400' : ''}`}
                variant={'default'}
                disabled={!isValid}
                onClick={onNextStep}>
                다음
            </Button>
        </section>
    );
}
