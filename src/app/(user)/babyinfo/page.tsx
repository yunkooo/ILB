'use client';

import Image from 'next/image';

import Funnel from '@/lib/funnel/Funnel';
import useFunnel from '@/lib/funnel/useFunnel';

import { FormProvider, useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { actionBabyInfo } from '@/data/actions/babyAction';

import BabyMonth from './BabyMonth';
import BabyBirth from './BabyBirth';
import BabyBody from './BabyBody';
import BabyGender from './BabyGender';
import BabyName from './BabyName';
import { BabyForm } from '@/types/baby';

const steps = ['BabyName', 'BabyMonth', 'BabyGender', 'BabyBirth', 'BabyBody'];

// const FormSchema = z.object({
//     name: z
//         .string()
//         .min(1, 'Name is required')
//         .max(50, 'Name must be less than 50 characters'),
//     month: z
//         .string()
//         .regex(/^(0[1-9]|1[0-2])$/, 'Month must be a valid month (01-12)'),
//     birth: z
//         .string()
//         .regex(
//             /^\d{4}-\d{2}-\d{2}$/,
//             'Birth date must be in the format YYYY-MM-DD',
//         ),
//     height: z
//         .string()
//         .min(1, 'Height is required')
//         .regex(/^\d+$/, 'Height must be a number')
//         .transform(val => parseInt(val, 10)),
//     weight: z
//         .string()
//         .min(1, 'Weight is required')
//         .regex(/^\d+$/, 'Weight must be a number')
//         .transform(val => parseInt(val, 10)),
//     gender: z.enum(['man', 'girl']),
// });

export default function Babyinfo({ params }: { params: { id: string } }) {
    const { step, onNextStep } = useFunnel({ steps });

    const methods = useForm({
        defaultValues: {
            name: '',
            month: '',
            birth: '',
            height: '',
            weight: '',
            gender: 'man',
        },
        mode: 'onChange',
    });

    //& FIXME : toast 모바일 상에서 위치 수정
    async function onSubmit(formData: BabyForm) {
        // passwordCheck 데이터를 제외하기 위한 객체복사
        console.log('Form Data:', formData);
        const resData = await actionBabyInfo(formData);

        if (resData.ok) {
            toast({
                title: `아이 정보 입력 성공!
            		반갑습니다 ${formData.name}님`,
                duration: 1500,
            });
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
