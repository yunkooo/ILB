import { Product } from '@/types';
import ProductCard from '../../list/ProductCard';

const stepArr = [
    {
        step: 1,
        month: '0개월 ~ 4개월',
        characteristic: ['아이가 뛰어 놀아요', '아이가 울어요'],
    },
];

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

export default async function CheckProduct() {
    const { item }: { item: Product[] } = await getData();
    const dataFilter: Product[] = item.filter(item => item.step);
    return (
        <section>
            <h1>금쪽이에게 필요한 이달의 상품</h1>
            <div className='bg-pink-300 p-5'>
                <div className='flex gap-3 '>
                    <div className='flex flex-col'>
                        <div>이미지</div>
                        <div>이미지설명</div>
                    </div>
                    <div>
                        <ul>
                            <li>아이 특징그자체입니다</li>
                            <li>아이 특징그자체입니다</li>
                            <li>아이 특징그자체입니다</li>
                            <li>아이 특징그자체입니다</li>
                        </ul>
                    </div>
                </div>
                <div className='bg-white py-4 px-2.5 rounded-xl grid grid-cols-3 gap-2.5'>
                    {/* {dataFilter.map(item => {
                        return <ProductItem item={item} key={item._id} />;
                    })} */}
                    <div>상품1</div>
                    <div>상품1</div>
                    <div>상품1</div>
                    <div>상품1</div>
                    <div>상품1</div>
                    <div>상품1</div>
                    <div>상품1</div>
                    <div>상품1</div>
                    <div>상품1</div>
                    <div>상품1</div>
                </div>
            </div>
        </section>
    );
}
