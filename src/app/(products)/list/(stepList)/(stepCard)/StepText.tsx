type Props = {
    text: string;
};

export default function StepText({ text }: Props) {
    return (
        <li className='list-none font-normal text-left text-sm break-keep text-txt'>
            {text}
        </li>
    );
}
