import { GoArrowLeft } from 'react-icons/go';

export default function BackHeader() {
    return (
        <header className='fixed py-2.5 px-5 w-[375px] top-0 bg-transparent z-10'>
            <button className='w-9 h-9'>
                <GoArrowLeft className='mx-auto w-7 h-7 text-[#4C4646]' />
            </button>
        </header>
    );
}
