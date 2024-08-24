import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';

export default function ProductIntro() {
    return (
        <article className='pt-24 pb-[60px] px-5 flex flex-col items-center gap-[60px] text-center bg-main-bg-image bg-cover'>
            <h2 className='text-[21px]'>
                <span className='text-[32px] font-bold'>우리 아이를 위한</span>
                <br />
                맞춤형 성장 패키지
            </h2>
            <Image
                className='mx-auto'
                src='/mobileMockup.svg'
                width={190}
                height={384}
                alt='moble sample image'
            />
            <Link href='/list' className='w-full text-center'>
                <Button
                    variant='linkToList'
                    size='lg'
                    radius='lg'
                    fontSize='md'>
                    상품 보러가기
                </Button>
            </Link>
        </article>
    );
}
