'use client';

import useScrollPosition from '@/hooks/useScroll';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SideBar from './SideBar';

export default function Header() {
    const pathname = usePathname();
    const isMatchMain = pathname === '/';
    const { scrollPosition } = useScrollPosition();

    return (
        <header
            className={`${scrollPosition ? (isMatchMain ? 'bg-gradient-to-t from-opacity via-gradient to-white to-90%' : 'bg-white') : 'bg-transparent'} fixed py-2.5 px-5 max-w-screen w-full top-0  z-10`}>
            <nav className='flex justify-between items-center'>
                <Link href='/'>
                    <Image
                        src='/logo_icon.svg'
                        alt='logo'
                        width={36}
                        height={36}
                    />
                </Link>
                <SideBar />
            </nav>
        </header>
    );
}
