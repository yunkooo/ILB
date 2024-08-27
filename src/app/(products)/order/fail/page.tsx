import Image from 'next/image';
import Link from 'next/link';

export default function FailPage() {
    return (
        <section className='flex flex-col items-center'>
            <Image
                width={100}
                height={100}
                src='/baby/baby_1.svg'
                alt='등만 보이는 아이 이미지'
            />
            <h1 className='mt-5'>결제 신청이 취소 되었습니다</h1>
            <div className='mt-[42px] flex gap-[15px]'>
                <Link
                    className='flex items-center border border-primary-foreground justify-center bg-white w-40 h-default font-medium rounded-default'
                    href='/'>
                    홈으로 가기
                </Link>
                <Link
                    className='flex items-center bg-primary-foreground justify-center w-40 h-default font-medium rounded-default'
                    href='/list'>
                    전체 상품 보러가기
                </Link>
            </div>
        </section>
    );
}
