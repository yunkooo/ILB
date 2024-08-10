import ProductItem from '@/components/ProductItem';
import { Product } from '@/types';

type Props = {
    currentStep: number;
};

const getData = async () => {
    const res = await fetch('https://api.fesp.shop/products', {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json',
            'client-id': '05-ILB',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

export default async function SubItemList({ currentStep }: Props) {
    const { item }: { item: Product[] } = await getData();
    const dataFilter: Product[] = item.filter(
        item => item.step === currentStep,
    );
    return (
        <div className='grid grid-cols-[100px_100px_100px] justify-around gap-y-7 py-7 mb-[60px] border-[1px] border-primary-foreground rounded-[30px]'>
            {dataFilter.map((item, i) => (
                <ProductItem key={i} item={item} />
            ))}
        </div>
    );
}
