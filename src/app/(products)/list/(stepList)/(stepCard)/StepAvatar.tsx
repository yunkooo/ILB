import Image from 'next/image';

type Props = {
    month: string;
    step: number;
    isCurrentStep: boolean;
};

export default function StepAvatar({ month, step, isCurrentStep }: Props) {
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
            <p
                className={`${isCurrentStep ? 'bg-[#FF9999] text-white border-[#FF9999] border-[1px]' : 'text-txt-foreground border-[1px]'} py-[2px] w-full text-xs mt-2.5 rounded-xl`}>
                {month}
            </p>
        </div>
    );
}
