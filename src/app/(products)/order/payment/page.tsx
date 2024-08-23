import PaymentButton from './PaymentButton';

export default function PaymentInfo() {
    return (
        <section>
            <h1 className='pt-7 mb-10 font-bold text-[28px]'>결제정보</h1>
            <div className='flex flex-col gap-3.5'>
                <div className='flex justify-between'>
                    <p className='text-txt-foreground'>상품 총 금액</p>
                    <p className='font-bold'>62,000원</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-txt-foreground'>정 배송 할인 금액</p>
                    <p className='font-bold'>12,000원</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-txt-foreground'>배송비</p>
                    <p className='font-bold'>0원</p>
                </div>
                <hr className='border-[#CDC5C5]' />
                <div className='flex justify-between'>
                    <p className='text-lg font-bold'>결제 금액</p>
                    <p className='text-lg font-bold'>50,0000원</p>
                </div>
            </div>
            <PaymentButton />
        </section>
    );
}
