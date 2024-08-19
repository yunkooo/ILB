import { FaArrowLeft } from 'react-icons/fa6';
import useScrollPosition from '@/hooks/useScroll';

export default function BackHeader() {
    const { scrollPosition } = useScrollPosition();

    const handleBack = () => {
        window.history.back();
    };

    return (
        <header
            className={`${scrollPosition ? 'bg-white' : 'bg-transparent'} fixed py-2.5 px-5 w-[375px] top-0  z-10`}>
            <button className='w-6 h-6' onClick={handleBack}>
                <FaArrowLeft className='mx-auto my-1 w-4 h-4' />
            </button>
        </header>
    );
}
