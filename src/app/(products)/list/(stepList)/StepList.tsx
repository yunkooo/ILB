import { Accordion } from '@/components/ui/Accordion';
import { actionCodes, actionProducts } from '@/data/actions/productsAction';
import { Code, Product } from '@/types';
import { actionUserData } from '@/data/actions/userAction';
import { getStepNumber } from '@/util/dateCalc';
import { auth } from '@/auth';
import StepCard from './(stepCard)/StepCard';

export default async function StepList() {
    const { item: products }: { item: Product[] } = await actionProducts();
    const { item: codes }: Code = await actionCodes(); // step 코드 전체조회

    const session = await auth();

    let userData;
    const codesArray = codes.step.codes;

    if (session) {
        const { item } = await actionUserData();
        userData = item;
    }
    const currentStep = getStepNumber(userData?.extra.baby.birth);
    // 현재 태어날 날짜로 부터 일수를 계산해서 어느 step 범위에 들어가는지 계산한다.
    const checkStep = codesArray.find((step: any) => {
        const [prev, next] = step.value.match(/\d+/g).map(Number);
        if (currentStep !== undefined) {
            return currentStep >= prev && currentStep <= next;
        }
    });

    return (
        <Accordion className='flex flex-col gap-5' type='multiple'>
            {codesArray.map((step, i) => {
                const filterData = products.filter(
                    product => product.category[0] === step.code,
                );
                return (
                    <StepCard
                        codeData={step}
                        currentStep={checkStep?.code}
                        data={filterData}
                        idx={i}
                    />
                );
            })}
        </Accordion>
    );
}
