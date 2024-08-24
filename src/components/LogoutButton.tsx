'use client';

import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { TbLogout } from 'react-icons/tb';

import { itemType } from './layout/SideBar';

export default function LogoutButton({
    itemVariants,
}: {
    itemVariants: itemType;
}) {
    return (
        <motion.button
            key={8}
            onClick={() => {
                localStorage.setItem('toastMessage', `로그아웃 되었습니다.`);
                signOut({ callbackUrl: '/' });
            }}
            whileHover={{ scale: 1.1 }}
            className='hover:bg-[#fdf9f9] flex items-center w-[90%] mx-auto rounded-lg py-3 px-5 text-left'
            variants={itemVariants}>
            <TbLogout className='mr-2 text-[#FF7032]' />
            로그아웃
        </motion.button>
    );
}
