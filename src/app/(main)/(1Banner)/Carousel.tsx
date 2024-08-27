'use client';

import React from 'react';
import Carousel, { DotProps } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

type Props = {
    children: React.ReactNode;
};

const CustomDot = ({ onClick, active }: DotProps) => {
    return (
        <li className='mx-2 my-6 inline-block cursor-pointer' onClick={onClick}>
            <div
                className={`w-[14px] h-[14px] rounded-full ${active ? 'bg-white' : 'bg-white opacity-30'}`}
            />
        </li>
    );
};

export default function MultiCarousel({ children }: Props) {
    return (
        <Carousel
            arrows={false}
            infinite
            autoPlay
            showDots
            customDot={<CustomDot />}
            ssr
            responsive={responsive}
            containerClass='carousel-container'
            dotListClass='custom-dot-list'>
            {children}
        </Carousel>
    );
}
