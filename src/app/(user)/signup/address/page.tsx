'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

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

export default function Address() {
    const open = useDaumPostcodePopup(
        'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
    );
    const [zipCode, setZipcode] = useState<string>('');
    const [roadAddress, setRoadAddress] = useState<string>('');
    const [searchAddress, setSearchAddress] = useState(false);

    // const completeHandler = (data: any) => {
    // 		setSearchAddress(false);
    // 		setZipcode(data.zonecode); // 추가
    // 		setRoadAddress(data.roadAddress); // 추가
    // };

    // const handleSearchAddress = () => {
    // 		setSearchAddress(true);
    // };

    const handleComplete = (data: Address) => {
        setZipcode(data.zonecode); // 추가
        setRoadAddress(data.roadAddress); // 추가
    };

    const openAddressPopup = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <section>
            <Image
                src={'/logo_M.svg'}
                alt='ILB'
                width={60}
                height={60}
                className='mb-2 mx-auto'
            />
            <h1 className='text-center mb-[91px] font-bold'>회원가입</h1>

            <div>
                <Label
                    className='text-base text-txt-foreground'
                    htmlFor='zipCode'>
                    우편번호
                </Label>
                <div className='relative flex'>
                    <Input
                        id='zipCode'
                        className='border-0 border-b-[1px] rounded-none p-[5px] border-txt-foreground self-end mr-2'
                        type='text'
                        placeholder='우편번호를 검색하세요'
                        value={zipCode}
                        onChange={e => setZipcode(e.target.value)}
                    />
                    <Button
                        type='submit'
                        className='font-notoSansKr right-0 bottom-[0.0625rem]'
                        size={'sm'}
                        fontSize={'sm'}
                        fontWeight={'sm'}
                        onClick={openAddressPopup}>
                        검색
                    </Button>
                </div>
                <Label className='sr-only' htmlFor='roadAddress'>
                    도로명 주소
                </Label>
                <Input
                    id='roadAddress'
                    className='border-0 border-b-[1px] rounded-none p-[5px] text-xl border-txt-foreground mt-4'
                    type='text'
                    placeholder='주소를 입력하세요'
                    value={roadAddress}
                    onChange={e => setRoadAddress(e.target.value)}
                />
                <Label className='sr-only' htmlFor='detailAddress'>
                    상세 주소
                </Label>
                <Input
                    id='detailAddress'
                    className='border-0 border-b-[1px] rounded-none p-[5px] text-xl border-txt-foreground mt-4'
                    type='text'
                    placeholder='상세 주소를 입력하세요'
                />
                <Button
                    type='submit'
                    className='font-notoSansKr mt-[134px]'
                    variant={'default'}>
                    다음
                </Button>
            </div>
        </section>
    );
}
