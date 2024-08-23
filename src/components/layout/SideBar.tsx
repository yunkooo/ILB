'use client';

import { actionUserData } from '@/data/actions/userAction';
import { AnimatePresence, motion, useCycle } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { RxHamburgerMenu } from 'react-icons/rx';
import LogoutButton from '../LogoutButton';
import { Skeleton } from '../ui/skeleton';

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
    const [open, cycleOpen] = useCycle(false, true);
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

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
                    <RxHamburgerMenu className='mx-auto w-7 h-7 text-[#4C4646]' />
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
                        className='bg-red-100 h-screen absolute top-0 right-0 rounded-lg'>
                        <motion.div
                            className='mt-10 mx-2 flex flex-col'
                            initial='closed'
                            animate='open'
                            exit='closed'
                            variants={sideVariants}>
                            <motion.div
                                key={1}
                                whileHover={{ scale: 1.1 }}
                                variants={itemVariants}>
                                {loading ? (
                                    <div className='pt-[56px] px-[18px] mb-8 flex flex-col space-y-3'>
                                        <Skeleton className='h-[20px] w-[70px] bg-gray-200' />
                                        <Skeleton className=' h-[20px] w-[300px] bg-gray-200' />
                                    </div>
                                ) : userName ? (
                                    <div className='pt-[56px] px-[18px] mb-8'>
                                        <span className='font-bold'>
                                            {userName}
                                        </span>
                                        님,
                                        <p className='mt-1'>
                                            소중한 우리 아이와 행복한 순간을
                                            함께하세요!
                                        </p>
                                    </div>
                                ) : (
                                    <button
                                        className='text-left mt-[40px] pt-[16px] px-[18px] mb-8'
                                        onClick={() =>
                                            handleLinkClick('/login')
                                        }>
                                        <span className='font-bold'>
                                            로그인
                                        </span>
                                        이 필요합니다.
                                    </button>
                                )}
                            </motion.div>
                            <motion.button
                                key={2}
                                onClick={() => handleLinkClick('/')}
                                whileHover={{ scale: 1.1 }}
                                variants={itemVariants}
                                className='hover:bg-slate-50 items-center w-full rounded-lg my-1'>
                                홈
                            </motion.button>
                            <motion.button
                                key={3}
                                onClick={() => handleLinkClick('/list')}
                                whileHover={{ scale: 1.1 }}
                                variants={itemVariants}>
                                상품 리스트
                            </motion.button>
                            <motion.button
                                key={4}
                                onClick={() => handleLinkClick('/')}
                                whileHover={{ scale: 1.1 }}
                                variants={itemVariants}>
                                (함께 보면 좋은 사이트)
                            </motion.button>
                            <motion.button
                                key={5}
                                onClick={() => handleLinkClick('/')}
                                whileHover={{ scale: 1.1 }}
                                variants={itemVariants}>
                                (파트너사)
                            </motion.button>
                            <hr className='my-6 border-[#CDC5C5]' />
                            <motion.button
                                key={6}
                                whileHover={{ scale: 1.1 }}
                                variants={itemVariants}
                                onClick={() => {
                                    if (userName) {
                                        handleLinkClick('/mypage');
                                    } else {
                                        handleLinkClick('/login');
                                    }
                                }}>
                                마이 페이지
                            </motion.button>
                            <motion.button
                                key={7}
                                onClick={() => handleLinkClick('/')}
                                whileHover={{ scale: 1.1 }}
                                variants={itemVariants}>
                                설정
                            </motion.button>
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
