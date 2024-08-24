import Image from 'next/image';
import PaymentButton from './PaymentButton';
export default function PaymentInfo() {
    return (
        <section>
            <h1 className='pt-7 font-bold text-[28px]'>월간 이용권</h1>
            <h2 className='mt-[26px] font-bold text-[20px]'>
                월 49,000원 정기결제
            </h2>

            <div className='mt-[54px] border px-5 py-[22px] flex flex-col gap-[22px] rounded-2xl'>
                <div className='flex justify-between'>
                    <p className='font-bold text-[16px] text-[#968F8F]'>
                        다음 결제 예정일
                    </p>
                    <p className='font-bold'>2024.09.23</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <div className='flex'>
                        <div className='flex items-center'>
                            <Image
                                src='/toss_logo.svg'
                                height={24}
                                width={24}
                                alt='toss logo'
                            />
                            <p className='font-bold align-top text-base'>
                                toss
                            </p>
                        </div>
                        <p className='font-bold text-base text-[#968F8F]'>
                            결제 수단
                        </p>
                    </div>
                    <p className='font-bold text-base'>카드 간편 결제</p>
                </div>
            </div>
            <PaymentButton />
        </section>
    );
}
