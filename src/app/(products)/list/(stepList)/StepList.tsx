import { Accordion } from '@/components/ui/Accordion';
import { actionCodes, actionProducts } from '@/data/actions/productsAction';
import { Code, Product, UserData, Codes } from '@/types';
import { actionUserData } from '@/data/actions/userAction';
import { getStepNumber } from '@/util/dateCalc';
import { auth } from '@/auth';
import StepCard from './(stepCard)/StepCard';

export default async function StepList() {
    let products: Product[] = [];
    let codesArray: Codes[] = [];
    let userData: UserData | null = null;

    try {
        // Products data 받아온다.

        const productsResponse = await actionProducts();
        if (productsResponse?.item) {
            products = productsResponse.item;
        } else {
            console.error('products data를 받아오는데 실패했습니다.');
        }

        // code data 받아온다.

        const codeDataResponse = await actionCodes();
        if (codeDataResponse?.item) {
            const codeData: Code = codeDataResponse.item;
            codesArray = codeData.step.codes;
        } else {
            console.error('Failed to fetch code data.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);

        console.error('code data를 받아오는데 실패했습니다.');
    }

    const session = await auth();

    if (session) {
        try {
            const userDataResponse = await actionUserData();
            if (userDataResponse?.item) {
                userData = userDataResponse.item;
            } else {
                console.error('user data 를 받아오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
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
        <Accordion className='flex flex-col gap-7' type='multiple'>
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
