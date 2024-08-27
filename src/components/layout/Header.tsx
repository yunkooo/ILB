'use client';

import useScrollPosition from '@/hooks/useScroll';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SideBar from './SideBar';

export default function Header() {
    const pathname = usePathname();
    const isMatchMain = pathname === '/';
    const isMatchList = pathname === '/list';
    const { scrollPosition } = useScrollPosition();

    //@ background color 조건부 설정
    const backgroundClass = scrollPosition
        ? isMatchMain
            ? 'bg-gradient-to-t from-opacity via-gradient to-white to-90%'
            : 'bg-white'
        : isMatchList
          ? 'bg-[#FFF8E1]'
          : 'bg-transparent';

    return (
        <header
            className={`${backgroundClass} fixed py-2.5 px-5 max-w-screen w-full top-0 z-10`}>
            <nav className='flex justify-between items-center'>
                <Link href='/'>
                    {!scrollPosition && isMatchMain ? (
                        <Image
                            src='/logo/logo_icon_w.svg'
                            alt='logo'
                            width={36}
                            height={36}
                        />
                    ) : (
                        <Image
                            src='/logo/logo_icon.svg'
                            alt='logo'
                            width={36}
                            height={36}
                        />
                    )}
                </Link>
                <SideBar />
            </nav>
        </header>
    );
}
