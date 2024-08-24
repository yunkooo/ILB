'use client';

import { actionUserData } from '@/data/actions/userAction';
import { AnimatePresence, motion, useCycle } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FcLike } from 'react-icons/fc';
import { TiHomeOutline } from 'react-icons/ti';
import { IoMdGift } from 'react-icons/io';
import { PiLinkSimpleBold } from 'react-icons/pi';
import { HiOutlineUser } from 'react-icons/hi';
import LogoutButton from '../LogoutButton';
import { Skeleton } from '../ui/skeleton';
import useScrollPosition from '@/hooks/useScroll';

const halfWidth = '70%';

export type itemType = {
    closed: {
        opacity: number;
    };
    open: { opacity: number };
};

const itemVariants: itemType = {
    closed: {
        opacity: 0,
    },
    open: { opacity: 1 },
};

const sideVariants = {
    closed: {
        transition: {
            staggerChildren: 0.1,
            staggerDirection: -1,
        },
    },
    open: {
        transition: {
            staggerChildren: 0.1,
            staggerDirection: 1,
        },
    },
};

export default function SideBar() {
    const router = useRouter();
    const pathname = usePathname();
    const [open, cycleOpen] = useCycle(false, true);
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const isMatchMain = pathname === '/';
    const { scrollPosition } = useScrollPosition();

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
    }, [open]);

    const handleLinkClick = (to: string) => {
        cycleOpen();

        setTimeout(() => {
            router.push(to);
        }, 500);
    };

    return (
        <>
            {!open ? (
                <button className='w-9 h-9' onClick={() => cycleOpen()}>
                    <RxHamburgerMenu
                        className={`${!scrollPosition && isMatchMain ? 'text-white' : 'text-[#4C4646]'} mx-auto w-7 h-7`}
                    />
                </button>
            ) : (
                <div
                    className='cursor-pointer z-10'
                    onClick={() => cycleOpen()}>
                    <PiXBold className='absolute top-[18px] right-5 w-6 h-6 text-[#4C4646]' />
                </div>
            )}
            <AnimatePresence>
                {open && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{
                            width: halfWidth,
                            opacity: 1,
                        }}
                        transition={{ type: 'spring' }}
                        exit={{
                            width: 0,
                            opacity: 0,
                            transition: { delay: 1, duration: 0.3 },
                        }}
                        className='bg-[#FFEBEC] h-screen absolute top-0 right-0 rounded-lg'>
                        <motion.div
                            className=' mt-10 flex flex-col'
                            initial='closed'
                            animate='open'
                            exit='closed'
                            variants={sideVariants}>
                            <motion.div
                                key={1}
                                variants={itemVariants}
                                className='rounded-lg mx-2 mt-5'>
                                {loading ? (
                                    <div className='pt-[56px] px-[18px] mb-5 flex flex-col space-y-3'>
                                        <Skeleton className='h-[20px] w-[70px] bg-gray-200' />
                                        <Skeleton className=' h-[20px] w-[300px] bg-gray-200' />
                                    </div>
                                ) : userName ? (
                                    <div className='py-10 px-5'>
                                        <span className='font-bold'>
                                            {userName}
                                        </span>
                                        님{' '}
                                        <FcLike className='inline-block align-baseline' />
                                        <p className='mt-2 break-keep'>
                                            소중한 우리 아이와 행복한 순간을
                                            함께하세요!
                                        </p>
                                    </div>
                                ) : (
                                    <motion.button
                                        className='text-left mt-[40px] pt-[16px] px-[18px] mb-8  w-full'
                                        onClick={() =>
                                            handleLinkClick('/login')
                                        }
                                        whileHover={{ scale: 1.1 }}>
                                        <span className='font-bold'>
                                            로그인
                                        </span>
                                        이 필요합니다.
                                    </motion.button>
                                )}
                            </motion.div>
                            <hr className='my-6 border-primary-foreground' />
                            <motion.button
                                key={2}
                                onClick={() => handleLinkClick('/')}
                                whileHover={{ scale: 1.1 }}
                                variants={itemVariants}
                                className='hover:bg-[#fdf9f9] flex items-center w-[90%] mx-auto rounded-lg py-3 px-5 text-left'>
                                <TiHomeOutline className='mr-2 text-[#C13DEE]' />
                                홈
                            </motion.button>
                            <motion.button
                                key={3}
                                onClick={() => handleLinkClick('/list')}
                                whileHover={{ scale: 1.1 }}
                                variants={itemVariants}
                                className='hover:bg-[#fdf9f9] flex items-center w-[90%] mx-auto rounded-lg py-3 px-5 text-left'>
                                <IoMdGift className='mr-2 text-[#F945A7]' />
                                상품 리스트
                            </motion.button>
                            <motion.button
                                key={4}
                                onClick={() => handleLinkClick('/')}
                                whileHover={{ scale: 1.1 }}
                                variants={itemVariants}
                                className='hover:bg-[#fdf9f9] flex items-center w-[90%] mx-auto rounded-lg py-3 px-5 text-left'>
                                <PiLinkSimpleBold className='mr-2 text-[#42D674]' />
                                함께 보면 좋은 사이트
                            </motion.button>

                            {userName && (
                                <>
                                    <hr className='my-6 border-primary-foreground' />
                                    <motion.button
                                        key={5}
                                        whileHover={{ scale: 1.1 }}
                                        variants={itemVariants}
                                        onClick={() => {
                                            if (userName) {
                                                handleLinkClick('/mypage');
                                            } else {
                                                handleLinkClick('/login');
                                            }
                                        }}
                                        className='hover:bg-[#fdf9f9] flex items-center w-[90%] mx-auto rounded-lg py-3 px-5 text-left'>
                                        <HiOutlineUser className='mr-2 text-[#3D99EE]' />
                                        마이 페이지
                                    </motion.button>
                                </>
                            )}

                            {userName && (
                                <LogoutButton itemVariants={itemVariants} />
                            )}
                        </motion.div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
