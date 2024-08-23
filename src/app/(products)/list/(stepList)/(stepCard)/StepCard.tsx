import { ChevronDown } from 'lucide-react';
import { PiClover } from 'react-icons/pi';
import ProductItem from '@/components/ProductItem';
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/Accordion';
import MonthAvatar from './StepAvatar';
import StepText from './StepText';
import StepChecker from './StepChecker';
import { Codes, Product } from '@/types';

type Props = {
    data: Product[];
    codeData: Codes;
    idx: number;
    currentStep?: string;
};

export default function StepCard({ data, codeData, idx, currentStep }: Props) {
    return (
        <AccordionItem
            className={`relative  rounded-xl border-0 ${codeData.code === currentStep ? 'mt-9 bg-[#FFB1B1]' : 'bg-[#FFEBEE]'}`}
            // value값 card 마다 다르게 주어야한다.
            value={`item-${codeData.code}`}>
            {codeData.code === currentStep ? (
                <StepChecker currentMonth={5} />
            ) : (
                ''
            )}
            <AccordionTrigger className='py-5 px-4 hover:no-underline flex-col items-start justify-center'>
                <div className='flex gap-6'>
                    <MonthAvatar month={`${codeData.value}`} step={idx} />
                    <ul className='flex flex-col gap-2.5 list-disc py-2.5'>
                        {codeData.description
                            .reverse()
                            .slice(0, 2)
                            .map((text: string, idx: number) => (
                                <StepText text={text.slice(0, 33)} key={idx} />
                            ))}
                    </ul>
                </div>
                <ChevronDown className='self-center h-6 w-6 text-txt-foreground transition-transform duration-200' />
            </AccordionTrigger>
            <AccordionContent className='px-2.5 py-2.5'>
                <span className='text-txt-foreground'>
                    <PiClover className='inline-block' /> 이 상품들 중 개월수에
                    맞춰 선별하여 보내드려요.
                </span>
                <div className='bg-white py-4 px-2.5 mt-4 rounded-xl grid grid-cols-3 gap-2.5'>
                    {data.map((product: Product, i: number) => (
                        <ProductItem item={product} key={i} />
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
