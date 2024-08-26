import Image from 'next/image';

export default function BannerItem({ img }: { img: string }) {
    return (
        <div className='relative w-screen h-full'>
            <Image
                src={`/${img}.webp`}
                width={430}
                height={932}
                alt='banner image'
                priority={true}
            />
        </div>
    );
}
