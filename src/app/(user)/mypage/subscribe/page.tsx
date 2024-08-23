import Image from 'next/image';
import { actionUserData } from '@/data/actions/userAction';
import { actionCodes } from '@/data/actions/productsAction';
import { getStepNumber } from '@/util/dateCalc';
import SubDescription from '@/components/subscribe/SubDescription';
import SubItemList from '@/components/subscribe/SubItemList';
import { Codes } from '@/types';

export default async function Subscribe() {
    // 유저 정보를 가져온다(아이 개월수)
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
        <section>
            <Image
                src='/baby/baby_avatar.svg'
                alt='baby_img'
                width={60}
                height={60}
                className='mx-auto mb-2'
            />
            <h1 className='mb-7 font-bold text-center'>구독 상품 조회</h1>
            <div className='px-3 py-4 mb-7 bg-[#FFEBEC] rounded-3xl'>
                {checkStep ? (
                    checkStep.description.map((desc: string, i: number) => (
                        <SubDescription key={i} text={desc} />
                    ))
                ) : (
                    <p>현재 단계에 해당하는 구독 정보를 찾을 수 없습니다.</p>
                )}
            </div>
            {checkStep && <SubItemList currentStep={checkStep.code} />}
        </section>
    );
}
