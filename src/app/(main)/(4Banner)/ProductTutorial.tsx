import Link from 'next/link';
import { Button } from '../../../components/ui/button';

export default function ProductTutorial() {
    return (
        <article className='pt-24 pb-[60px] flex flex-col px-5 items-center gap-[72px] text-center bg-[#FFFCF7]'>
            <h2 className='mb-3 text-[21px]'>
                <span className='text-[32px] font-bold'>우리 아이 맞춤</span>
                <br />
                구독 서비스 시작하기
            </h2>
            <div className='relative flex flex-col gap-[70px]'>
                <div className='relative'>
                    <div className='absolute py-2 w-[50px] h-[50px] rounded-full top-0 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-[#65C09B] text-white text-2xl font-bold text-center'>
                        <span>1</span>
                    </div>
                    <div className='pt-[38px] pb-[25px] px-8 bg-white rounded-xl'>
                        <p className='mb-1 text-lg text-[#7DC8AA] font-bold'>
                            아이 정보 입력
                        </p>
                        <p className='text-sm'>
                            소중한 우리 아이의 이야기를 들려주세요
                        </p>
                    </div>
                </div>
                <div className='relative'>
                    <div className='absolute py-2 w-[50px] h-[50px] rounded-full top-0 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-[#7D93C8] text-white text-2xl font-bold text-center'>
                        <span>2</span>
                    </div>
                    <div className='pt-[38px] pb-[25px] px-8 bg-white rounded-xl'>
                        <p className='mb-1 text-lg text-[#7D93C8] font-bold'>
                            구독 서비스 제품 확인
                        </p>
                        <p className='text-sm'>
                            성장 단계에 맞는 특별한 아이템을 준비했어요
                        </p>
                    </div>
                </div>
                <div className='relative'>
                    <div className='absolute py-2 w-[50px] h-[50px] rounded-full top-0 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-[#7DBAC8] text-white text-2xl font-bold text-center'>
                        <span>3</span>
                    </div>
                    <div className='pt-[38px] pb-[25px] px-8 bg-white rounded-xl'>
                        <p className='mb-1 text-lg text-[#7DBAC8] font-bold'>
                            매달 정기 배송
                        </p>
                        <p className='text-sm'>
                            우리 아이의 행복한 성장을 함께 응원해요
                        </p>
                    </div>
                </div>
            </div>
            <Link href='/order' className='w-full text-center'>
                <Button
                    variant='linkToOrder'
                    size='lg'
                    radius='lg'
                    fontSize='md'>
                    구독하러가기
                </Button>
            </Link>
        </article>
    );
}
