import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '소셜 로그인 | 🧸모든 육아러들을 위한 ILB',
    description: '초보 육아러들을 위한 따뜻한 서비스',
    openGraph: {
        title: 'ILB - 🧸소셜 로그인',
        description: '초보 육아러들을 위한 따뜻한 서비스',
        url: '/checklogin',
        images: {
            url: '/logo_bg.svg',
        },
    },
};

export default function CheckLoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
