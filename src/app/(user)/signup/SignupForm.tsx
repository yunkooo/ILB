'use client';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useFormContext } from 'react-hook-form';

type Address = {
    zonecode: string;
    address: string;
    roadAddress: string;
    // addressEnglish: string;
    // addressType: 'R' | 'J';
    // userSelectedType: 'R' | 'J';
    // noSelected: 'Y' | 'N';
    // userLanguageType: 'K' | 'E';
    // bname: string;
};

export default function SignupForm() {
    const form = useFormContext();
    const { setValue } = form;

    // 주소 API 팝업
    const open = useDaumPostcodePopup(
        'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
    );

    // 주소 선택시 form에 값 삽입
    const handleComplete = (data: Address) => {
        setValue('zoneCode', data.zonecode);
        setValue('roadAddress', data.roadAddress);
    };

    // 주소 API 값 선택시 함수 호출
    const openAddressPopup = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <>
            <FormField
                control={form.control}
                name='name'
                rules={{
                    required: '이름을 입력해 주세요.',
                    minLength: {
                        value: 2,
                        message: '2글자 이상 입력해 주세요.',
                    },
                    maxLength: {
                        value: 10,
                        message: '10글자 이하 입력해 주세요.',
                    },
                }}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>이름</FormLabel>
                        <FormControl>
                            <Input
                                className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground w-[97%] mx-1 mt-2'
                                type='text'
                                placeholder='이름을 입력해주세요 (2~10글자 이내)'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='email'
                rules={{
                    required: '이메일을 입력해 주세요.',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,4}$/,
                        message: '이메일을 올바르게 입력해 주세요.',
                    },
                }}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                            <Input
                                className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground w-[97%] mx-1 mt-2'
                                type='email'
                                placeholder='이메일을 입력해주세요'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='password'
                rules={{
                    required: '비밀번호를 입력해 주세요.',
                    minLength: {
                        value: 8,
                        message: '8자리 이상 입력해 주세요.',
                    },
                    maxLength: {
                        value: 15,
                        message: '15자리 이하 입력해 주세요.',
                    },
                    pattern: {
                        value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$#&*?!%])[A-Za-z\d!@$#%&*?]{8,15}$/,
                        message:
                            '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
                    },
                }}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>비밀번호</FormLabel>
                        <FormControl>
                            <Input
                                className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground w-[97%] mx-1 mt-2'
                                type='password'
                                placeholder='8~15글자이고, 영문,숫자,특수문자를 포함하여야합니다.'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className='whitespace-pre-line' />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='passwordCheck'
                rules={{
                    required: '비밀번호 확인을 입력해 주세요.',
                    validate: value =>
                        value === form.watch('password') ||
                        '비밀번호가 일치하지 않습니다.',
                }}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>비밀번호 확인</FormLabel>
                        <FormControl>
                            <Input
                                className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground w-[97%] mx-1 mt-2'
                                type='password'
                                placeholder='비밀번호를 한번 더 입력해주세요'
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='phone'
                rules={{
                    required: '휴대폰 번호를 입력해 주세요.',
                    minLength: {
                        value: 11,
                        message: '핸드폰 번호는 11자리여야 합니다.',
                    },
                    maxLength: {
                        value: 11,
                        message: '핸드폰 번호는 11자리여야 합니다.',
                    },
                    pattern: {
                        value: /^010/,
                        message: '유효한 휴대폰 번호를 입력해 주세요.',
                    },
                }}
                render={({ field }) => (
                    <FormItem className='mb-6'>
                        <FormLabel htmlFor='phone'>휴대폰 번호</FormLabel>
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
                rules={{
                    required: '우편번호를 입력해주세요',
                }}
                render={({ field }) => (
                    <FormItem className='mb-6'>
                        <FormLabel htmlFor='zoneCode'>우편 번호</FormLabel>
                        <FormControl className='flex'>
                            <div className='flex items-end'>
                                <Input
                                    id='zoneCode'
                                    className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground w-[97%] mx-1 mt-2'
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
                rules={{
                    required: '주소를 입력해주세요',
                }}
                name='roadAddress'
                render={({ field }) => (
                    <FormItem className='mb-6'>
                        <FormLabel htmlFor='roadAddress'>도로명 주소</FormLabel>
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
                rules={{
                    required: '상세를 입력해주세요',
                }}
                render={({ field }) => (
                    <FormItem className='mb-6'>
                        <FormLabel htmlFor='detailAddress'>상세 주소</FormLabel>
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
        </>
    );
}
