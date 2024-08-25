import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '로그인 | 🧸모든 육아러들을 위한 ILB',
    description: '초보 육아러들을 위한 따뜻한 서비스',
    openGraph: {
        title: 'ILB - 🧸로그인',
        description: '초보 육아러들을 위한 따뜻한 서비스',
        url: '/login',
        images: {
            url: '/logo_bg.svg',
        },
    },
};

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
