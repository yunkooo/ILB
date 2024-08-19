'use client';

import ProductItem from '@/components/ProductItem';
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/Accordion';
import { ChevronDown } from 'lucide-react';
import MonthAvatar from './StepAvatar';
import ProductCardText from './StepText';

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

export default function StepCard({ data, codeData }: any) {
    return (
        <AccordionItem
            className='relative bg-[#FFEBEE] rounded-xl border-0'
            // value값 card 마다 다르게 주어야한다.
            value={`item-${codeData.code}`}>
            {/* <MonthCheck /> */}
            <AccordionTrigger className='py-5 px-4 hover:no-underline flex-col items-start justify-center'>
                <div className='flex gap-6'>
                    <MonthAvatar month={`${codeData.value}`} />
                    <ul className='list-disc py-2.5'>
                        {codeData.description
                            .reverse()
                            .slice(0, 2)
                            .map((text: any, idx: any) => (
                                <ProductCardText
                                    text={text.slice(0, 31)}
                                    key={idx}
                                />
                            ))}
                    </ul>
                </div>
                <ChevronDown className='self-center h-4 w-4 transition-transform duration-200' />
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
