import StepHeader from '@/components/layout/StepHeader';

export default function OrderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ko'>
            <body>
                <StepHeader />
                {children}
            </body>
        </html>
    );
}
