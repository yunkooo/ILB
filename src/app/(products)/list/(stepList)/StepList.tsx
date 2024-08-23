import { Accordion } from '@/components/ui/Accordion';
import { actionCodes, actionProducts } from '@/data/actions/productsAction';
import { Code, Product, UserData, Codes } from '@/types';
import { actionUserData } from '@/data/actions/userAction';
import { getStepNumber } from '@/util/dateCalc';
import { auth } from '@/auth';
import StepCard from './(stepCard)/StepCard';

export default async function StepList() {
    const { item: products }: { item: Product[] } = await actionProducts();
    const { item: codeData }: { item: Code } = await actionCodes(); // step 코드 전체조회

    const session = await auth();

    let userData: UserData | null = null;
    const codesArray = codeData.step.codes;

    if (session) {
        const { item } = await actionUserData();
        userData = item;
    }

    const currentMonth = userData?.extra.baby?.birth
        ? getStepNumber(userData.extra.baby.birth)
        : undefined;
    // 현재 태어날 날짜로 부터 일수를 계산해서 어느 step 범위에 들어가는지 계산한다.
    const checkStep = codesArray.find((codes: Codes) => {
        const matchedNumbers = codes.value.match(/\d+/g);
        if (matchedNumbers) {
            const [prev, next] = matchedNumbers.map(Number);
            if (currentMonth !== undefined) {
                return currentMonth >= prev && currentMonth <= next;
            }
        }
    });

    return (
        <Accordion className='flex flex-col gap-5' type='multiple'>
            {codesArray.map((codes: Codes, i: number) => {
                const filterData = products.filter(
                    product => product.category[0] === codes.code,
                );
                return (
                    <StepCard
                        codeData={codes}
                        currentStep={checkStep?.code}
                        data={filterData}
                        idx={i}
                        key={i}
                        currentMonth={currentMonth}
                        babyName={userData?.extra.baby?.name}
                    />
                );
            })}
        </Accordion>
    );
}
