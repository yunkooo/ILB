import Image from 'next/image';

type Props = {
    month: string;
    step: string;
};

export default function StepAvatar({ month, step }: Props) {
    return (
        <div className='flex flex-col items-center'>
            <div className='relative h-[74px] w-[74px] bg-white rounded-full'>
                <Image
                    className='absolute top-[5px] left-2.5'
                    width={60}
                    height={60}
                    src={`/baby/baby_${step + 1}.svg`}
                    alt=''
                />
            </div>
            <p className='text-sm text-txt-foreground mt-2.5'>{month}</p>
        </div>
    );
}
