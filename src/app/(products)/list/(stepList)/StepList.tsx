import { Accordion } from '@/components/ui/Accordion';
import { actionCodes, actionProducts } from '@/data/actions/productsAction';
import { Code, Product } from '@/types';
import StepCard from './(stepCard)/StepCard';

export default async function StepList() {
    const { item: products }: Product = await actionProducts();
    const { item: codes }: Code = await actionCodes(); // step 코드 전체조회

    const codesArray = codes.step.codes;

    return (
        <Accordion className='flex flex-col gap-5' type='multiple'>
            {codesArray.map(step => {
                const filterData = products.filter(
                    product => product.category[0] === step.code,
                );
                return <StepCard codeData={step} data={filterData} />;
            })}
        </Accordion>
    );
}
