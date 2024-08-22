import ProductItem from '@/components/ProductItem';
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/Accordion';
import { ChevronDown } from 'lucide-react';
import MonthAvatar from './StepAvatar';
import StepText from './StepText';
import StepChecker from './StepChecker';

type Props = {
    stepInfo: {
        code: string;
        value: string;
        description: string[];
    };
    products: {
        item: {
            _id: number;
            name: string;
            mainImages: [{ path: string }];
            category: string[];
            quantity: number;
            seller_id: number;
            price: number;
            show: boolean;
            active: boolean;
            seller: {};
            replies: number;
            bookmarks: number;
            options: number;
        }[];
    };
};

export default async function StepCard({ data, codeData, currentStep }: any) {
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
                    <MonthAvatar month={`${codeData.value}`} />
                    <ul className='flex flex-col gap-2.5 list-disc py-2.5'>
                        {codeData.description
                            .reverse()
                            .slice(0, 2)
                            .map((text: any, idx: any) => (
                                <StepText text={text.slice(0, 31)} key={idx} />
                            ))}
                    </ul>
                </div>
                <ChevronDown className='self-center h-6 w-6 text-txt-foreground transition-transform duration-200' />
            </AccordionTrigger>
            <AccordionContent className='px-2.5 py-2.5'>
                <div className='bg-white py-4 px-2.5 rounded-xl grid grid-cols-3 gap-2.5'>
                    {data.map((product: any) => {
                        return <ProductItem item={product} />;
                    })}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}
