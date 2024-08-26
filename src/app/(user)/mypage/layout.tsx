import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '마이페이지 | 🧸모든 육아러들을 위한 ILB',
    description: '초보 육아러들을 위한 따뜻한 서비스',
    openGraph: {
        title: 'ILB - 🧸마이페이지',
        description: '초보 육아러들을 위한 따뜻한 서비스',
        url: '/mypage',
        images: {
            url: '/logo/logo_bg.svg',
        },
    },
};

export default function MypageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
