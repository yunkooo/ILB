import { actionUserData } from '@/data/actions/userAction';
import Image from 'next/image';
import Link from 'next/link';

export default async function CompletePage() {
    const { item: userData } = await actionUserData();
    return (
        <section className='bg-[#F6F6F6] items-center px-0 flex flex-col w-full'>
            <article className='flex flex-col items-center bg-white px-5 pb-[38px] border-b-[1px] border-[#DDDDDD] w-full max-w-xl'>
                <Image
                    width={100}
                    height={100}
                    src='/baby/baby_7.svg'
                    alt='웃고 있는 아이 이미지'
                />
                <h1 className='mt-5'>정기 구독이 신청되었습니다</h1>
                <div className='mt-[42px] flex gap-[15px]'>
                    <Link
                        className='flex items-center border border-primary-foreground justify-center bg-white w-40 h-default font-medium rounded-default'
                        href='/'>
                        홈으로 가기
                    </Link>
                    <Link
                        className='flex items-center bg-primary-foreground justify-center w-40 h-default font-medium rounded-default'
                        href='/mypage/subscribe'>
                        구독상품 보러가기
                    </Link>
                </div>
            </article>
            <article className='px-5 pt-[30px] pb-[36px] bg-white mt-[3px] border-b-[1px] border-[#DDDDDD] w-full max-w-xl'>
                <h2 className='pb-[18px] font-bold text-lg'>배송정보</h2>
                <div className='w-full bg-[#F7EFEF] h-[1px]' />

                <div className='flex mt-6'>
                    <p className=' text-txt-foreground'>수령인</p>
                    <p className='ml-[46px]'>{userData.name}</p>
                </div>
                <div className='flex mt-3.5'>
                    <p className='text-txt-foreground'>휴대폰</p>
                    <p className='ml-[46px]'>{userData.phone}</p>
                </div>
                <div className='flex mt-3.5'>
                    <p className='text-txt-foreground'>주소지</p>
                    <p className='ml-[46px]'>{`${userData.roadAddress}, ${userData.detailAddress}`}</p>
                </div>
            </article>
            <article className='mt-[3px] pb-[100px] px-6 items-center text-center bg-receipt-bg-image bg-contain bg-no-repeat w-full max-w-xl'>
                <h2 className='pt-[24px] pb-[17px] font-bold text-lg'>
                    결제정보
                </h2>
                <hr className='border-[#CDC5C5] border-dashed' />
                <div className='pt-[23px] gap-[14px] flex flex-col'>
                    <div className='flex justify-between'>
                        <p className='text-txt-foreground'>상품 총 금액</p>
                        <p className='font-bold'>69,000원</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-txt-foreground'>배송비</p>
                        <p className='pb-[14px] font-bold'>0원</p>
                    </div>
                    <hr className='border-[#CDC5C5] border-dashed' />
                    <div className='flex justify-between pb-[25px]'>
                        <p className='text-lg font-bold'>결제 금액</p>
                        <p className='text-lg font-bold'>69,000원</p>
                    </div>
                    <hr className='border-[#CDC5C5] border-dashed' />
                    <Image
                        src='/receipt.svg'
                        alt='receipt barcode'
                        className='pt-[10px] pb-[23px]'
                        width={430}
                        height={400}
                    />
                </div>
            </article>
        </section>
    );
}
