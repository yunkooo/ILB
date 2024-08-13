import { GoArrowLeft } from 'react-icons/go';
import useScrollPosition from '@/hooks/useScroll';

export default function BackHeader() {
    const { scrollPosition } = useScrollPosition();

    return (
        <header
            className={`${scrollPosition ? 'bg-white' : 'bg-transparent'} fixed py-2.5 px-5 w-[375px] top-0  z-10`}>
            <button className='w-9 h-9'>
                <GoArrowLeft className='mx-auto w-6 h-6 text-[#4C4646]' />
            </button>
        </header>
    );
}
