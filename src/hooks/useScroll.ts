'use client';

import { useEffect, useState } from 'react';

export default function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState(false);

    // scroll 위치에 따른 상태 관리
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrollPosition(true);
        } else {
            setScrollPosition(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return {
        scrollPosition,
    };
}
