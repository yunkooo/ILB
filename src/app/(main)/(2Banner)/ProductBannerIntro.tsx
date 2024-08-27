import Image from 'next/image';

export default function ProductBannerIntro() {
    return (
        <article className='relative'>
            <Image
                src='/banner/banner_intro.webp'
                width={430}
                height={753}
                alt='intro image'
            />
        </article>
    );
}
