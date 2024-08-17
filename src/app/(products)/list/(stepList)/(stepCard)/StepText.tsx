type Props = {
    text: string;
};

export default function StepText({ text }: Props) {
    return <p className='text-left'>{text}</p>;
}
