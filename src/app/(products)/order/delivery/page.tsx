'use client';

import { TargetArea } from '@/components/Spinner';
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
import {
    actionUserDataModify,
    actionUserData,
} from '@/data/actions/userAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

async function fetchUserData() {
    const { item: userData } = await actionUserData();
    return userData;
}

export default function CheckDelivery() {
    const router = useRouter();

    const { isPending, data: userData } = useQuery({
        queryKey: ['userData'],
        queryFn: fetchUserData,
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            phone: '',
            zoneCode: '',
            roadAddress: '',
            detailAddress: '',
        },
        mode: 'onChange',
    });

    const { watch, setValue } = form;

    const open = useDaumPostcodePopup(
        'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
    );

    // 주소 API 값 선택시 함수 호출
    const openAddressPopup = () => {
        open({ onComplete: handleComplete });
    };

    // 주소 선택시 form에 값 삽입
    const handleComplete = (data: Address) => {
        setValue('zoneCode', data.zonecode);
        setValue('roadAddress', data.roadAddress);
    };

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const res = await actionUserDataModify(data);
            if (res.ok) {
                router.push('/order/payment');
            } else {
                console.error('뭔가 문제있음.');
            }
        } catch {
            console.error('에러 삐--');
        }
    }

    useEffect(() => {
        if (userData) {
            setValue('name', userData.name);
            setValue('phone', userData.phone);
            setValue('zoneCode', userData.zoneCode);
            setValue('roadAddress', userData.roadAddress);
            setValue('detailAddress', userData.detailAddress);
        }
    }, [userData, setValue]);

    const isFormValid =
        watch().name &&
        watch().phone &&
        watch().zoneCode &&
        watch().roadAddress &&
        watch().detailAddress;

    return (
        <section>
            {isPending ? (
                <TargetArea />
            ) : (
                <>
                    <h1 className='pt-7 mb-10 font-bold text-[28px]'>
                        배송정보를 확인해주세요
                    </h1>
                    <div className='h-[50vh] custom-scrollbar'>
                        <Form {...form}>
                            <form
                                id='checkDelivery'
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='w-full '>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>받는 사람</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground w-[97%] mx-1 mt-2'
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
                                        <FormItem>
                                            <FormLabel htmlFor='phone'>
                                                휴대폰 번호
                                            </FormLabel>
                                            <FormControl className='flex'>
                                                <Input
                                                    id='phone'
                                                    className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground w-[97%] mx-1 mt-2'
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
                                        <FormItem>
                                            <FormLabel htmlFor='zoneCode'>
                                                우편 번호
                                            </FormLabel>
                                            <FormControl className='flex'>
                                                <div>
                                                    <Input
                                                        id='zoneCode'
                                                        className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground w-[97%] mx-1 mt-2'
                                                        type='text'
                                                        placeholder='우편번호를 검색하세요'
                                                        {...field}
                                                    />
                                                    <Button
                                                        type='button'
                                                        className='right-0 bottom-[0.0625rem]'
                                                        size='sm'
                                                        fontSize='sm'
                                                        fontWeight='sm'
                                                        onClick={
                                                            openAddressPopup
                                                        }>
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
                                        <FormItem>
                                            <FormLabel htmlFor='roadAddress'>
                                                도로명 주소
                                            </FormLabel>
                                            <FormControl className='flex'>
                                                <Input
                                                    id='roadAddress'
                                                    className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground w-[97%] mx-1 mt-2'
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
                                                    className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground w-[97%] mx-1 mt-2'
                                                    type='text'
                                                    placeholder='상세 주소를 입력하세요'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </div>
                    <Button
                        form='checkDelivery'
                        type='submit'
                        className={`fixed mt-5 bottom-[60px] ${!isFormValid ? 'bg-gray-400' : ''}`}
                        variant='default'
                        size='fixed'
                        disabled={!isFormValid}>
                        다음
                    </Button>
                </>
            )}
        </section>
    );
}
