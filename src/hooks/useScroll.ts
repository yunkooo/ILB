'use client';

import { useEffect, useState } from 'react';

export default function useScrollPosition() {
    // 스크롤의 상태를 표시하기 위한 useState
    const [scrollPosition, setScrollPosition] = useState<boolean>(false);

    // scroll 위치에 따른 상태 관리
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrollPosition(true);
        } else {
            setScrollPosition(false);
        }
    };

    // 상태에 따라 이벤트를 등록하고 삭제한다.
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
