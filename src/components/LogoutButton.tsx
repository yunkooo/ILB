'use client';

import { signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
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
                signOut({ callbackUrl: '/login' });
            }}
            whileHover={{ scale: 1.1 }}
            variants={itemVariants}>
            로그아웃
        </motion.button>
    );
}
