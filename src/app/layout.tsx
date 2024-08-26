import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import HeaderSelector from '@/components/layout/HeaderSelector';
import AuthSession from './AuthSession';
import { Toaster } from '@/components/ui/toaster';
import { QueryProviders } from './QueryProvider';
import SessionHandler from './SessionHandler';

const notoSansKr = Noto_Sans_KR({
    preload: false,
    weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://ilovebaby.shop'),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ko'>
            <body className={notoSansKr.className}>
                <AuthSession>
                    <QueryProviders>
                        <SessionHandler />
                        <HeaderSelector />
                        {children}
                        <Toaster />
                    </QueryProviders>
                </AuthSession>
            </body>
        </html>
    );
}
