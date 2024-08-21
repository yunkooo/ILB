'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import useMenuStore from '@/zustand/menuStore';
import { RxHamburgerMenu } from 'react-icons/rx';
import { usePathname } from 'next/navigation';
import Nav from './Nav';
import useScrollPosition from '@/hooks/useScroll';

export default function Header() {
    const pathname = usePathname();
    const isMatchMain = pathname === '/';

    const { scrollPosition } = useScrollPosition();

    //# 메뉴 상태 전역 관리
    const { isOpen, setIsOpen } = useMenuStore();

    const handleOnClick = () => {
        setIsOpen();
    };

    // 스크롤 비활성화
    useEffect(() => {
        //# 메뉴 열릴 때 스크롤 비활성화
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            //# 메뉴 닫힐 때 스크롤 활성화
        } else {
            document.body.style.overflow = 'auto';
        }

        //# 컴포넌트 언마운트 시 스크롤 활성화
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <header
            className={`${scrollPosition ? (isMatchMain ? 'bg-gradient-to-t from-opacity via-gradient to-white to-90%' : 'bg-white') : 'bg-transparent'} fixed py-2.5 px-5 max-w-screen w-full top-0  z-10`}>
            <nav className='flex justify-between items-center'>
                <Link href={'/'}>
                    <Image
                        src={'/logo_icon.svg'}
                        alt='logo'
                        width={36}
                        height={36}
                    />
                </Link>
                <button className='w-9 h-9' onClick={handleOnClick}>
                    <RxHamburgerMenu className='mx-auto w-7 h-7 text-[#4C4646]' />
                </button>
            </nav>
            {isOpen && <Nav />}
        </header>
    );
}
