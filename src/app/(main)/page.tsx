import Footer from '@/app/(main)/(footer)/Footer';
import ProductIntro from './(3Banner)/ProductIntro';
import ProductTutorial from './(4Banner)/ProductTutorial';
import Banner from './(1Banner)/Banner';
import ProductBannerIntro from './(2Banner)/ProductBannerIntro';
import ProductCertification from './(5Banner)/ProductCertification';

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
