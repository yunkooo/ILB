import ProductItem from '@/components/ProductItem';
import { actionProducts } from '@/data/actions/productsAction';
import { Product } from '@/types';

type Props = {
    currentStep: string;
};

export default async function SubItemList({ currentStep }: Props) {
    const { item: products }: { item: Product[] } = await actionProducts();

    const dataFilter: Product[] = products.filter(
        product => product.category[0] === currentStep,
    );
    return (
        <div className='grid grid-cols-[100px_100px_100px] justify-around gap-y-7 py-7 mb-[60px] border-[1px] border-primary-foreground rounded-[30px]'>
            {dataFilter.map((item, i) => (
                <ProductItem key={i} item={item} />
            ))}
        </div>
    );
}
