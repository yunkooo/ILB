import DeliveryStatusItems from './DeliveryStatusItems';

type Props = {
    subscribeDate?: string;
};

export default function DeliveryCard({ subscribeDate }: Props) {
    return (
        <>
            <div className='flex justify-between items-end mb-4 text-sm'>
                <span className='font-bold'>배송 현황</span>
            </div>
            <DeliveryStatusItems subscribeDate={subscribeDate} />
        </>
    );
}
