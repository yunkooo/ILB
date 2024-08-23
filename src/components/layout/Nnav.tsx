// import { AnimatePresence, useCycle, motion } from 'framer-motion';
import React from 'react';

// const links = [
//     { name: 'Home', to: '#', id: 1 },
//     { name: 'About', to: '#', id: 2 },
//     { name: 'Blog', to: '#', id: 3 },
//     { name: 'Contact', to: '#', id: 4 },
// ];

// const itemVariants = {
//     closed: {
//         opacity: 0,
//     },
//     open: { opacity: 1 },
// };

// const sideVariants = {
//     closed: {
//         transition: {
//             staggerChildren: 0.2,
//             staggerDirection: -1,
//         },
//     },
//     open: {
//         transition: {
//             staggerChildren: 0.2,
//             staggerDirection: 1,
//         },
//     },
// };

export default function Nnav() {
    // const [open, cycleOpen] = useCycle(false, true);

    return (
        <>
            <div className='btn-container fixed'>
                {/* <button onClick={cycleOpen}>{open ? 'Close' : 'Open'}</button> */}
            </div>
            {/* <AnimatePresence> */}
            {/* {open && (
                    <motion.aside
                        initial={{ width: 0 }}
                        animate={{
                            width: 300,
                        }}
                        exit={{
                            width: 0,
                            transition: { delay: 0.7, duration: 0.3 },
                        }}
                        className='bg-slate-300 w-1/3 h-[70vh]'>
                        <motion.div
                            className='container my-6 mx-2'
                            initial='closed'
                            animate='open'
                            exit='closed'
                            variants={sideVariants}>
                            {links.map(({ name, to, id }) => (
                                <motion.a
                                    key={id}
                                    href={to}
                                    whileHover={{ scale: 1.1 }}
                                    variants={itemVariants}>
                                    {name}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.aside>
                )} */}
            {/* </AnimatePresence> */}
        </>
    );
}
