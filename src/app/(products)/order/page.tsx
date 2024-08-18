import SubItemList from '@/app/(user)/mypage/subscribe/SubItemList';
import { actionUserData } from '@/data/actions/userAction';
import { getStepNumber } from '@/util/dateCalc';
import Image from 'next/image';
import Link from 'next/link';
import SubDescription from './SubDescription';

const getStep = async () => {
    const res = await fetch('https://api.fesp.shop/codes/step', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'client-id': '05-ILB',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

export default async function OrderItems() {
    // 현재 구독중인 Step을 유저 정보에서 가져와 넣어주어야한다.

    const { item: userData } = await actionUserData();
    const {
        extra: { baby: babyData },
    } = userData;

    const {
        item: {
            step: { codes: stepArr },
        },
    } = await getStep();
    const currentStep = getStepNumber(babyData.birth);

    const checkStep = stepArr.filter((step: any) => {
        const [prev, next] = step.value
            .split('개월')[0]
            .split('~')
            .map((val: string) => parseInt(val));

        if (currentStep >= prev && currentStep <= next) return true;

        return false;
    })[0];

    return (
        <section>
            <Image
                src={'/baby_profile_img.svg'}
                alt='baby_img'
                width={60}
                height={60}
                className='mx-auto mb-2'
            />
            <h1 className='mb-7 font-bold text-center'>
                <span className='text-xl'>{babyData.name}</span>에게 필요한
                이달의 상품
            </h1>
            <div className='px-3 py-4 mb-7 bg-[#FFEBEC] rounded-3xl'>
                {checkStep.description.map((desc: string, i: number) => (
                    <SubDescription key={i} text={desc} />
                ))}
            </div>
            <SubItemList currentStep={checkStep.code} />
            <Link
                className='inline-flex items-center justify-center rounded-default box-border font-notoSansKr bg-primary text-white  -hover:bg-primary/50 text-base font-bold w-default h-default'
                href={'/order/checkDelivery'}>
                다음
            </Link>
        </section>
    );
}
