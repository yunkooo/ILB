import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '구독하기 | 🧸모든 육아러들을 위한 ILB',
    description: '초보 육아러들을 위한 따뜻한 서비스',
    openGraph: {
        title: 'ILB - 🧸구독하기',
        description: '초보 육아러들을 위한 따뜻한 서비스',
        url: '/order/*',
        images: {
            url: '/logo/logo_bg.svg',
        },
    },
};

export default function OrderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
