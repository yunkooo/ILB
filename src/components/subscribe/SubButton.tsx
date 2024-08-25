'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

type Props = {
    link: string;
};

export default function SubButton({ link }: Props) {
    const router = useRouter();
    const handleOnClick = () => {
        router.push(`${link}`);
    };
    return (
        <Button
            type='button'
            className='mb-[60px] box-border'
            variant='default'
            onClick={handleOnClick}>
            다음
        </Button>
    );
}
