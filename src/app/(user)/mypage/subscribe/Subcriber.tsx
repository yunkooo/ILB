import Image from 'next/image';
import SubDescription from '@/components/subscribe/SubDescription';
import { Codes } from '@/types';
import { actionCodes } from '@/data/actions/productsAction';
import { actionUserData } from '@/data/actions/userAction';
import { getStepNumber } from '@/util/dateCalc';
import SubItemList from '@/components/subscribe/SubItemList';

export default async function Subscriber() {
    const { item: userData } = await actionUserData();

    const {
        extra: { baby: babyData },
    } = userData;

    // 전체 step을 가져온다.
    const {
        item: {
            step: { codes: stepArr },
        },
    } = await actionCodes();

    const currentStep = getStepNumber(babyData.birth);

    // 현재 태어날 날짜로 부터 일수를 계산해서 어느 step 범위에 들어가는지 계산한다.
    const checkStep = stepArr.find((step: Codes) => {
        const matchedNumbers = step.value.match(/\d+/g);
        if (matchedNumbers) {
            const [prev, next] = matchedNumbers.map(Number);
            if (currentStep !== undefined) {
                return currentStep >= prev && currentStep <= next;
            }
        }
    });
    return (
        <>
            <Image
                src='/baby/baby_avatar.svg'
                alt='baby_img'
                width={60}
                height={60}
                className='mx-auto mb-2'
            />
            <h1 className='mb-7 font-bold text-center'>구독 상품 조회</h1>
            <div className='px-3 py-4 mb-7 bg-[#FFEBEC] rounded-3xl'>
                {checkStep.description.map((desc: string, i: number) => (
                    <SubDescription key={i} text={desc} />
                ))}
            </div>
            {checkStep && <SubItemList currentStep={checkStep.code} />}
        </>
    );
}
