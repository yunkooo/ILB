import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import BackHeader from '@/components/layout/BackHeader';

export default function BabyInfoLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ko'>
            <body>
                <BackHeader />
                {children}
            </body>
        </html>
    );
}
