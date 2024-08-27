import { Product } from '@/types';
import Image from 'next/image';

type Props = {
    item: Product;
};

export default function ProductItem({ item }: Props) {
    const { name, mainImages } = item;

    return (
        <div className='flex flex-col items-center'>
            <div className='w-[92px] h-[92px] rounded-xl border border-[#ffd9db]'>
                <Image
                    src={`https://api.fesp.shop${mainImages[0].path}`}
                    width={100}
                    height={100}
                    className='rounded-xl w-full h-full'
                    alt=''
                />
            </div>
            <p className='text-center mt-2 break-keep'>{name}</p>
        </div>
    );
}
