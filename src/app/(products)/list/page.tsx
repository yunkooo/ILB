import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import StepList from './(stepList)/StepList';

export const metadata: Metadata = {
    title: '상품 리스트 | 🧸모든 육아러들을 위한 ILB',
    description: '초보 육아러들을 위한 따뜻한 서비스',
    openGraph: {
        title: 'ILB - 🧸상품 리스트',
        description: '초보 육아러들을 위한 따뜻한 서비스',
        url: '/list',
        images: {
            url: '/logo_bg.svg',
        },
    },
};

export default async function ListPage() {
    return (
        <article className='bg-[#FFF8E1]'>
            <section>
                <h1 className='text-lg font-medium py-7 px-1'>
                    우리 아이를 위해 준비했어요
                </h1>
                <StepList />
                <Link href='/order' scroll={false}>
                    <Button
                        type='button'
                        className='my-[60px] box-border'
                        variant='default'>
                        구독하러가기
                    </Button>
                </Link>
            </section>
        </article>
    );
}
