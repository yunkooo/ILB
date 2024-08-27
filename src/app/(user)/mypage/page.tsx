import { actionUserData } from '@/data/actions/userAction';
import { getDayNumbers, getStepNumber } from '@/util/dateCalc';
import Image from 'next/image';
import LinkCard from './LinkCard';
import DeliveryCard from './DeliveryCard';
import ChartCard from './ChartCard';
const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
export default async function MyPage() {
    const { item: user } = await actionUserData();
    const baby = user?.extra?.baby;
    const subscribe = user?.extra?.subscribe;
    const profile = user?.profileImage;
    return (
        <section className='py-7'>
            <div className='flex gap-5 items-center mb-14'>
                <div className='w-[90px]'>
                    <div className='flex justify-center items-center w-[90px] h-[90px] rounded-full'>
                        {profile.slice(0, 6) === '/files' ? (
                            <Image
                                src={`${SERVER}${profile}`}
                                width={60}
                                height={60}
                                alt='baby_profile_img'
                            />
                        ) : (
                            <Image
                                src={`${profile}`}
                                width={60}
                                height={60}
                                alt='baby_profile_img'
                            />
                        )}
                    </div>
                </div>
                {baby && (
                    <div>
                        <h3 className='text-lg font-bold'>
                            {user?.name}
                            <span className='text-sm font-normal'>
                                님의 아이는 지금
                            </span>
                        </h3>
                        {baby && (
                            <>
                                <p className='py-3.5 text-sm font-normal'>
                                    <span className='font-bold text-base'>
                                        {getStepNumber(baby.birth)}
                                    </span>
                                    개월
                                </p>
                                <p className='text-sm font-normal'>
                                    세상에 온 지{' '}
                                    <span className='font-bold text-base'>
                                        {getDayNumbers(baby.birth)}일
                                    </span>
                                    째 되는 날이에요!
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>
            {baby && <ChartCard growData={baby.grow} />}
            {subscribe && <DeliveryCard subscribeDate={subscribe.date} />}

            <LinkCard title='내정보 수정' link='/mypage/editprofile' />
            <LinkCard title='구독 상품 조회' link='/mypage/subscribe' />
        </section>
    );
}
