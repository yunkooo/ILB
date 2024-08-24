import { differenceInDays, parse } from 'date-fns';
import {
    CiCreditCard1,
    CiShoppingCart,
    CiDeliveryTruck,
    CiGift,
} from 'react-icons/ci';
import { GoChevronRight } from 'react-icons/go';

interface DeliveryStatus {
    label: string;
    isActive: boolean;
    icon: React.ReactNode;
}

// @ 배송 상태 더미 데이터
const deliveryStatuses: DeliveryStatus[] = [
    {
        label: '입금/결제',
        isActive: false,
        icon: <CiCreditCard1 className='w-8 h-9' />,
    },
    {
        label: '배송준비중',
        isActive: false,
        icon: <CiShoppingCart className='w-9 h-9' />,
    },
    {
        label: '배송중',
        isActive: false,
        icon: <CiDeliveryTruck className='w-9 h-9' />,
    },
    {
        label: '배송완료',
        isActive: false,
        icon: <CiGift className='w-9 h-8' />,
    },
];
type Props = {
    subscribeDate?: string;
};

export default function DeliveryStatusItems({ subscribeDate }: Props) {
    if (subscribeDate) {
        const subDate = parse(subscribeDate, 'yyyyMMdd', new Date());
        const currentDate = new Date();

        const diffDays = differenceInDays(currentDate, subDate) % 30;

        if (diffDays >= 0 && diffDays <= 3) {
            deliveryStatuses[0].isActive = true;
        } else if (diffDays >= 4 && diffDays <= 6) {
            deliveryStatuses[1].isActive = true;
        } else if (diffDays >= 7 && diffDays <= 10) {
            deliveryStatuses[2].isActive = true;
        } else if (diffDays >= 11 && diffDays <= 13) {
            deliveryStatuses[3].isActive = true;
        }
    }
    return (
        <div
            className={`flex justify-between py-3 px-[29px] mb-8 w-full bg-card rounded-2xl`}>
            {deliveryStatuses.map((status, i) => (
                <>
                    <div
                        key={i}
                        className={`flex flex-col justify-between items-center gap-[3px] ${status.isActive ? '' : 'text-txt-foreground'}`}>
                        {status.icon}
                        <span className='text-[10px] leading-[14px] font-medium'>
                            {status.label}
                        </span>
                    </div>
                    {i < deliveryStatuses.length - 1 && (
                        <GoChevronRight className='mt-2.5 text-[#CED4DA]' />
                    )}
                </>
            ))}
        </div>
    );
}
