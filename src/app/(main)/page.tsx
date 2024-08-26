import Footer from '@/app/(main)/(footer)/Footer';
import ProductIntro from './(3Banner)/ProductIntro';
import ProductTutorial from './(4Banner)/ProductTutorial';
import Banner from './(1Banner)/Banner';
import ProductBannerIntro from './(2Banner)/ProductBannerIntro';
import ProductCertification from './(5Banner)/ProductCertification';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '🧸ILB',
    description: '초보 육아러들을 위한 따뜻한 서비스',
    openGraph: {
        title: '🧸ILB',
        description: '초보 육아러들을 위한 따뜻한 서비스',
        url: '/',
        images: {
            url: '/logo/logo_bg.svg',
        },
    },
};

// export function generateMetadata({ params }: { params: { type: string } }): Metadata{
//   const boardName = params.type;
//   return {
//     title: ${boardName} - 멋사컴,
//     description: ${boardName} 게시판입니다.,
//     openGraph: {
//       title: ${boardName} - 멋사컴,
//       description: ${boardName} 게시판입니다.,
//       url: /${params.type},
//       images: {
//         url: '/images/fesp.webp'
//       }
//     }
//   };
// }

//layout.tsx
//@ server component에서만 사용 가능
// export const metadata: Metadata = {
//@ url 관련 설정시 metadata 사용될 기본 경로 지정
// metadataBase: new URL('https://next.fesp.shop'/),
// };

export default function Home() {
    return (
        <>
            <main>
                <Banner />
                <ProductBannerIntro />
                <ProductIntro />
                <ProductTutorial />
                <ProductCertification />
            </main>
            <Footer />
        </>
    );
}
