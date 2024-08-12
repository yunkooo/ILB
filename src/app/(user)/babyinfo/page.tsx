'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import BabyMonth from './BabyMonth';
import BabyBirth from './BabyBirth';
import BabyBody from './BabyBody';
import BabyGender from './BabyGender';
import BabyName from './BabyName';
import Funnel from '@/lib/funnel/Funnel';
import useFunnel from '@/lib/funnel/useFunnel';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { z } from 'zod';
import { actionBabyInfo } from '@/data/actions/babyAction';

const steps = ['BabyName', 'BabyMonth', 'BabyGender', 'BabyBirth', 'BabyBody'];

export type Gender = 'man' | 'girl';

export interface GrowType {
    weight: number;
    height: number;
    date: string;
}

export interface BabyInfoData {
    name: string;
    month: string;
    birth: string;
    grow: GrowType[];
    gender: Gender;
}

const FormSchema = z.object({
    name: z.string(),

    month: z.string(),

    birth: z.string(),

    height: z.number(),

    weight: z.number(),

    date: z.string(),

    gender: z.string(),
});

export default function Babyinfo({ params }: { params: { id: string } }) {
    const { step, onPrevStep, onNextStep } = useFunnel({ steps });

    // zod resolver - react-hook-form과 zod를 이어주는 다리 역할
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            month: '',
            birth: '',
            height: 0,
            weight: 0,
            gender: '',
            // certificationCode: '',
        },
    });

    //& FIXME : toast 모바일 상에서 위치 수정
    async function onSubmit(formData: z.infer<typeof FormSchema>) {
        // passwordCheck 데이터를 제외하기 위한 객체복사

        const resData = await actionBabyInfo(formData);

        if (resData.ok) {
            toast({
                title: `회원가입 성공!
            		반갑습니다 ${formData.name}님`,
                duration: 1500,
                // description: (
                //     <pre className='mt-2 w-[340px] rounded-md bg-primary p-4'>
                //         <code>{JSON.stringify(formData, null, 2)}</code>
                //     </pre>
                // ),
            });
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
    }

    const [babyInfoData, setbabyInfoData] = useState<BabyInfoData>({
        name: '',
        month: '',
        birth: '',
        grow: [],
        gender: 'man',
    });

    const onNext = (babyInfoData?: BabyInfoData) => {
        console.log(babyInfoData);
        if (babyInfoData) {
            setbabyInfoData(babyInfoData);
        }
        onNextStep();
    };

    return (
        <section>
            <Image
                src={'/logo_M.svg'}
                alt='ILB'
                width={60}
                height={60}
                className='mb-[18px] mx-auto'
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                    <Funnel step={step}>
                        <Funnel.Step name='BabyName'>
                            <BabyName
                                form={form}
                                babyInfoData={babyInfoData}
                                onNext={onNext}
                            />
                        </Funnel.Step>
                        <Funnel.Step name='BabyMonth'>
                            <BabyMonth
                                form={form}
                                babyInfoData={babyInfoData}
                                onNext={onNext}
                            />
                        </Funnel.Step>
                        <Funnel.Step name='BabyGender'>
                            <BabyGender
                                form={form}
                                babyInfoData={babyInfoData}
                                onNext={onNext}
                            />
                        </Funnel.Step>
                        <Funnel.Step name='BabyBirth'>
                            <BabyBirth
                                form={form}
                                babyInfoData={babyInfoData}
                                onNext={onNext}
                            />
                        </Funnel.Step>
                        <Funnel.Step name='BabyBody'>
                            <BabyBody
                                form={form}
                                babyInfoData={babyInfoData}
                                onNext={onNext}
                            />
                        </Funnel.Step>
                    </Funnel>
                    {/* <Button
                type='button'
                className='font-notoSansKr mb-[60px] box-border bottom-0'
                variant={'default'}
                onClick={() => onNext()}>
                다음
            </Button> */}
                </form>
            </Form>
        </section>
    );
}
