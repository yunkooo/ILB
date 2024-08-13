'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

const FormSchema = z.object({
    name: z
        .string()
        .min(2, { message: '2글자 이상 입력해 주세요.' })
        .max(10, { message: '10글자 이하 입력해 주세요.' }),

    phone: z
        .string()
        .length(11, { message: '핸드폰 번호는 11자리여야 합니다.' })
        .regex(/^010/, {
            message: "핸드폰 번호는 '010'으로 시작해야 합니다.",
        })
        .refine(value => !isNaN(Number(value)), {
            message: '핸드폰 번호는 숫자 형식이어야 합니다.',
        }),

    zoneCode: z.string(),

    roadAddress: z.string(),

    detailAddress: z.string(),
});

type Address = {
    zonecode: string;
    address: string;
    addressEnglish: string;
    addressType: 'R' | 'J';
    userSelectedType: 'R' | 'J';
    noSelected: 'Y' | 'N';
    userLanguageType: 'K' | 'E';
    roadAddress: string;
    bname: string;
};

export default function DeliveryInfo() {
    const { data: session } = useSession();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            phone: '',
            zoneCode: '',
            roadAddress: '',
            detailAddress: '',
        },
    });

    const open = useDaumPostcodePopup(
        'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
    );

    // 주소 API 값 선택시 함수 호출
    const openAddressPopup = () => {
        open({ onComplete: handleComplete });
    };

    // 주소 선택시 form에 값 삽입
    const handleComplete = (data: Address) => {
        form.setValue('zoneCode', data.zonecode);
        form.setValue('roadAddress', data.roadAddress);
    };

    //& 수정 필요 (toast)
    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            //   title: `로그인 성공!
            // 반갑습니다 000님`,
            description: (
                <pre className='mt-2 w-[340px] rounded-md bg-primary p-4'>
                    반갑다능
                </pre>
            ),
        });
    }

    //@ FIXME - 여기서 부터
    async function checkDelivery(data: z.infer<typeof FormSchema>) {
        console.log(session?.user.id);
        const userId = session?.user.id;

        const res = await fetch(`${SERVER}/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'client-id': '05-ILB',
                Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify(data),
        });
        console.log(res);
        // const userId = session?.user.id;
        // console.log(formData);
        // // 아이 정보 입력
        // const res = await fetch(`${SERVER}/users/${userId}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'client-id': '05-ILB',
        //         Authorization: `Bearer ${session?.accessToken}`,
        //     },
        //     body: JSON.stringify(formData),
        // });
        // const resData = await res.json();
        // return resData;
    }

    return (
        <div>
            <section>
                <h1 className='text-center mb-10 font-bold text-[28px]'>
                    배송정보를 확인해주세요
                </h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(checkDelivery)}
                        className='w-full'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem className='mb-8'>
                                    <FormLabel>받는 사람</FormLabel>
                                    <FormControl>
                                        <Input
                                            className='border-0 border-b-[1px] rounded-none p-[5px] text-[12px] border-txt-foreground'
                                            type='text'
                                            placeholder='이름을 입력해주세요'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='--destructive' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='phone'
                            render={({ field }) => (
                                <FormItem className='mb-6'>
                                    <FormLabel htmlFor='phone'>
                                        휴대폰 번호
                                    </FormLabel>
                                    <FormControl className='flex'>
                                        <Input
                                            id='phone'
                                            className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground'
                                            type='text'
                                            placeholder='휴대폰 번호를 입력해주세요'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='zoneCode'
                            render={({ field }) => (
                                <FormItem className='mb-6'>
                                    <FormLabel htmlFor='zoneCode'>
                                        우편 번호
                                    </FormLabel>
                                    <FormControl className='flex'>
                                        <div>
                                            <Input
                                                id='zoneCode'
                                                className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground'
                                                type='text'
                                                placeholder='우편번호를 검색하세요'
                                                {...field}
                                            />
                                            <Button
                                                type='button'
                                                className='font-notoSansKr right-0 bottom-[0.0625rem]'
                                                size={'sm'}
                                                fontSize={'sm'}
                                                fontWeight={'sm'}
                                                onClick={openAddressPopup}>
                                                검색
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='roadAddress'
                            render={({ field }) => (
                                <FormItem className='mb-6'>
                                    <FormLabel htmlFor='roadAddress'>
                                        도로명 주소
                                    </FormLabel>
                                    <FormControl className='flex'>
                                        <Input
                                            id='roadAddress'
                                            className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground'
                                            type='text'
                                            placeholder='주소를 입력하세요'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='detailAddress'
                            render={({ field }) => (
                                <FormItem className='mb-6'>
                                    <FormLabel htmlFor='detailAddress'>
                                        상세 주소
                                    </FormLabel>
                                    <FormControl className='flex'>
                                        <Input
                                            id='detailAddress'
                                            className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground'
                                            type='text'
                                            placeholder='상세 주소를 입력하세요'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit'>버버법트트트튼</Button>
                    </form>
                </Form>
                <Toaster />
            </section>
        </div>
    );
}
