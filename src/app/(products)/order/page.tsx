import { actionUserData } from '@/data/actions/userAction';
import { getStepNumber } from '@/util/dateCalc';
import Image from 'next/image';
import Link from 'next/link';
import SubDescription from '../../../components/subscribe/SubDescription';
import { actionCodes } from '@/data/actions/productsAction';
import SubItemList from '@/components/subscribe/SubItemList';

export default async function OrderItems() {
    // 유저 정보를 가져온다(아이 개월수)
    const {
        item: {
            extra: { baby: babyData },
        },
    } = await actionUserData();

    // 전체 step을 가져온다.
    const {
        item: {
            step: { codes: stepArr },
        },
    } = await actionCodes();

    const currentStep = getStepNumber(babyData.birth);

    // 현재 태어날 날짜로 부터 일수를 계산해서 어느 step 범위에 들어가는지 계산한다.
    const checkStep = stepArr.filter((step: any) => {
        const [prev, next] = step.value
            .split('개월')[0]
            .split('~')
            .map((val: string) => parseInt(val));
        if (currentStep !== undefined) {
            if (currentStep >= prev && currentStep <= next) return true;
        }

        return false;
    })[0];

    return (
        <section>
            <Image
                src={'/baby/baby_avatar.svg'}
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
                className='inline-flex items-center justify-center my-[60px] max-w-screen w-full h-default rounded-default box-border font-notoSansKr text-white text-base font-bold bg-primary -hover:bg-primary/50 '
                href={'/order/checkdelivery'}>
                다음
            </Link>
        </section>
    );
}
