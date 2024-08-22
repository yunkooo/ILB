'use client';

import { useRouter } from 'next/navigation';
import useMenuStore from '@/zustand/menuStore';
import { PiXBold } from 'react-icons/pi';
import LogoutButton from '../LogoutButton';
import { useEffect, useState } from 'react';
import { actionUserData } from '@/data/actions/userAction';
import { Skeleton } from '@/components/ui/skeleton';

export default function Nav() {
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    console.log(loading);
    const router = useRouter();

    //# 메뉴 상태 전역 관리
    const { setIsOpen } = useMenuStore();

    const handleOnClick = () => {
        setIsOpen();
    };

    useEffect(() => {
        async function fetchUserData() {
            try {
                const res = await actionUserData();
                setUserName(res?.item.name);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // 데이터 로드가 완료되면 로딩 상태를 false로 변경
            }
        }

        fetchUserData();
    }, []);

    //# 메뉴 버튼 클릭 이벤트
    const handleLinkClick = (path: string) => {
        setIsOpen();
        router.push(path);
    };

    return (
        <nav className='absolute flex flex-col top-0 left-0 w-full h-screen bg-white'>
            <PiXBold
                className='absolute top-[18px] right-5 w-6 h-6 text-[#4C4646]'
                onClick={handleOnClick}
            />
            {loading ? (
                <div className='pt-[56px] px-[18px] mb-8 flex flex-col space-y-3'>
                    <Skeleton className='h-[20px] w-[70px] bg-gray-200' />
                    <Skeleton className=' h-[20px] w-[300px] bg-gray-200' />
                </div>
            ) : userName ? (
                <div className='pt-[56px] px-[18px] mb-8'>
                    <span className='font-bold'>{userName}</span>
                    님,
                    <p className='mt-1'>
                        소중한 우리 아이와 행복한 순간을 함께하세요!
                    </p>
                </div>
            ) : (
                <button
                    className='text-left mt-[40px] pt-[16px] px-[18px] mb-8'
                    onClick={() => handleLinkClick('/login')}>
                    <span className='font-bold'>로그인</span>이 필요합니다.
                </button>
            )}

            <button
                className='py-[19px] px-[19px] text-left'
                onClick={() => handleLinkClick('/')}>
                홈
            </button>
            <button
                className='py-[19px] px-[19px] text-left'
                onClick={() => handleLinkClick('/list')}>
                상품 리스트
            </button>
            <button
                className='py-[19px] px-[19px] text-left'
                onClick={() => handleLinkClick('/')}>
                (함께 보면 좋은 사이트)
            </button>
            <button
                className='py-[19px] px-[19px] text-left'
                onClick={() => handleLinkClick('/')}>
                (파트너사)
            </button>
            <hr className='my-6 border-[#CDC5C5]' />
            <button
                className='py-[19px] px-[19px] text-left'
                onClick={() => {
                    if (userName) {
                        handleLinkClick('/mypage');
                    } else {
                        handleLinkClick('/login');
                    }
                }}>
                마이 페이지
            </button>
            <button
                className='py-[19px] px-[19px] text-left'
                onClick={() => handleLinkClick('/')}>
                설정
            </button>
            {userName && <LogoutButton />}
        </nav>
    );
}
