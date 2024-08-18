import Image from 'next/image';

type Props = {
    text: string;
};

export default function SubDescription({ text }: Props) {
    return (
        <div className='mb-2 flex'>
            <Image
                src={'/icon/icon_baby_feet.svg'}
                width={16}
                height={16}
                alt='feetIcon'
                className='mr-2'
            />
            <span className='text-sm break-keep'>{text}</span>
        </div>
    );
}
