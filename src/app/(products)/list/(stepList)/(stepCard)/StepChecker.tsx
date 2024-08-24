import Image from 'next/image';

type Props = {
    currentMonth?: number;
    babyName?: string;
};

export default function StepChecker({ currentMonth, babyName }: Props) {
    return (
        <div className='absolute -top-[45px] right-[5px] flex items-center gap-[7px]'>
            <p className='px-[15px] py-[4px] text-xs font-medium text-[#5A5A5A] bg-white border-[1px] rounded-2xl'>
                {babyName}({currentMonth}개월)
            </p>
            <Image
                src='/baby/baby_monthCheck.svg'
                width={60}
                height={51}
                alt='baby character'
            />
        </div>
    );
}
