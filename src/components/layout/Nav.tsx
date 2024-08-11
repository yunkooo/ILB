import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useMenuStore from '@/zustand/menuStore';
import { PiXBold } from 'react-icons/pi';
import LogoutButton from '../LogoutButton';

export default function Nav() {
    const session = useSession();
    const userData = session.data;

    const router = useRouter();

    //# 메뉴 상태 전역 관리
    const { setIsOpen } = useMenuStore();

    const handleOnClick = () => {
        setIsOpen();
    };

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
            {userData ? (
                <div className='pt-[56px] px-[18px] mb-8'>
                    <span className='font-bold'>{userData.user?.name}</span>
                    님,
                    <p className='mt-1'>
                        소중한 우리 아이와 행복한 순간을 함께하세요!
                    </p>
                </div>
            ) : (
                <div className='pt-[56px] px-[18px] mb-8'>
                    <button
                        className='font-bold'
                        onClick={() => handleLinkClick('/login')}>
                        로그인
                    </button>
                    이 필요합니다.
                </div>
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
                onClick={() => handleLinkClick('/mypage')}>
                마이 페이지
            </button>
            <button
                className='py-[19px] px-[19px] text-left'
                onClick={() => handleLinkClick('/')}>
                설정
            </button>
            {userData && <LogoutButton />}
        </nav>
    );
}
