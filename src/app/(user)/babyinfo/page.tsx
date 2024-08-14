'use client';

import Image from 'next/image';

import Funnel from '@/lib/funnel/Funnel';
import useFunnel from '@/lib/funnel/useFunnel';

import { FormProvider, useForm } from 'react-hook-form';
import { actionBabyInfo } from '@/data/actions/babyAction';

import BabyMonth from './BabyMonth';
import BabyBirth from './BabyBirth';
import BabyBody from './BabyBody';
import BabyGender from './BabyGender';
import BabyName from './BabyName';
import { BabyInputForm } from '@/types/baby';
import { useRouter } from 'next/navigation';

const steps = ['BabyName', 'BabyMonth', 'BabyGender', 'BabyBirth', 'BabyBody'];

export default function Babyinfo({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { step, onNextStep } = useFunnel({ steps });

    const methods = useForm<BabyInputForm>({
        defaultValues: {
            name: '',
            month: '0',
            birth: '',
            height: '',
            weight: '',
            gender: 'man',
        },
        mode: 'onChange',
    });

    //& FIXME : toast 모바일 상에서 위치 수정
    async function onSubmit(formData: BabyInputForm) {
        if (step !== 'BabyBody') return;
        // DB 형시에 맞추기 위해서 수정

        const newDay = new Date();

        const year = newDay.getFullYear();
        const month = String(newDay.getMonth() + 1).padStart(2, '0');
        const day = String(newDay.getDate()).padStart(2, '0');

        const formattedDate = `${year}${month}${day}`;
        const remakeFormData = {
            extra: {
                baby: {
                    name: formData.name,
                    month: formData.month,
                    birth: formData.birth,
                    grow: [
                        {
                            weight: formData.weight,
                            height: formData.height,
                            date: formattedDate,
                        },
                    ],
                    gender: formData.gender,
                },
            },
        };

        const resData = await actionBabyInfo(remakeFormData);
        if (resData.ok) {
            router.push('/login');
        } else {
            // API 서버의 에러 메시지 처리
            if ('errors' in resData) {
                resData.errors.forEach((error: any) =>
                    methods.setError(error.path, { message: error.msg }),
                );
            } else if (resData.message) {
                alert(resData.message);
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
                className='mb-[18px] mx-auto'
            />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Funnel step={step}>
                        <Funnel.Step name='BabyName'>
                            <BabyName onNext={onNextStep} />
                        </Funnel.Step>
                        <Funnel.Step name='BabyMonth'>
                            <BabyMonth onNext={onNextStep} />
                        </Funnel.Step>
                        <Funnel.Step name='BabyGender'>
                            <BabyGender onNext={onNextStep} />
                        </Funnel.Step>
                        <Funnel.Step name='BabyBirth'>
                            <BabyBirth onNext={onNextStep} />
                        </Funnel.Step>
                        <Funnel.Step name='BabyBody'>
                            <BabyBody />
                        </Funnel.Step>
                    </Funnel>
                </form>
            </FormProvider>
        </section>
    );
}
