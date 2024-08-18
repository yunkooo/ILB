import StepHeader from '@/components/layout/StepHeader';

export default function OrderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {/* <StepHeader /> */}
            {children}
        </>
    );
}
