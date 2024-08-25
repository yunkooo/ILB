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
            <div className='relative mx-auto w-[206px] h-[380px] rounded-[47px] overflow-hidden'>
                <Image
                    className='mx-auto mt-[42px] mobile_flow'
                    src='/list_page.webp'
                    width={170}
                    height={1217}
                    alt='list page image'
                />
                <Image
                    className='absolute -top-[10px] left-0'
                    src='/mobile.png'
                    layout='fill'
                    objectFit='contain'
                    alt='moble image'
                />
            </div>
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
