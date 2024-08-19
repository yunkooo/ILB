import { Product } from '@/types';
import Image from 'next/image';

type Props = {
    item: {
        _id: number;
        name: string;
        mainImages: [{ path: string }];
        category: string[];
        quantity: number;
        seller_id: number;
        price: number;
        show: boolean;
        active: boolean;
        seller: {};
        replies: number;
        bookmarks: number;
        options: number;
    };
};

export default function ProductItem({ item }: Props) {
    const { name, mainImages } = item;

    return (
        <div className='flex flex-col items-center'>
            <div className='bg-[#D9D9D9] w-[92px] h-[92px] rounded-xl border'>
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
