'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ChartCard from './ChartCard';
import DeliveryCard from './DeliveryCard';
import LinkCard from './LinkCard';
import { actionDataFetch } from '@/data/actions/fetchAction';
import { UserData } from '@/types';

export default async function MyPage() {
    const session = useSession();
    const userData = session.data;
    const status = session.status;
    const userId = userData?.user.id;
    const accessToken = userData?.accessToken;

    const [user, setUser] = useState<UserData>();

    // 회원 정보 불러오기
    useEffect(() => {
        if (userData) {
            actionDataFetch('GET', userId, accessToken)
                .then(resData => {
                    setUser(resData.item);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [session, status]);

    return (
        <section className='py-7'>
            <div className='flex gap-5 items-center mb-14'>
                <div className='w-[90px]'>
                    <div className='w-[90px] h-[90px] bg-pink-100 border-solid rounded-full'></div>
                </div>
                <div>
                    <h3 className='text-lg font-bold'>
                        {user?.name}
                        <span className='text-sm font-normal'>
                            님의 아이는 지금
                        </span>
                    </h3>

                    <p className='py-3.5 text-sm font-normal'>
                        <span className='font-medium'>12</span>개월
                    </p>
                    <p className='text-sm font-normal'>
                        세상에 온 지 <span className='font-medium'>00일</span>째
                        되는 날이에요!
                    </p>
                </div>
            </div>
            <ChartCard />
            <DeliveryCard />
            <LinkCard title={'내정보 수정'} link={'/mypage/editprofile'} />
            <LinkCard title={'구독 상품 조회'} link={'/mypage/subscribe'} />
        </section>
    );
}
