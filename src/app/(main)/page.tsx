import Footer from '@/app/(main)/(footer)/Footer';
import ProductIntro from './(3Banner)/ProductIntro';
import ProductTutorial from './(4Banner)/ProductTutorial';
import Banner from './(1Banner)/Banner';
import ProductBannerIntro from './(2Banner)/ProductBannerIntro';
import ProductCertification from './(5Banner)/ProductCertification';
import { Metadata } from 'next';
import Error from '../global-error';

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
