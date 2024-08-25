import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '회원가입 | 🧸모든 육아러들을 위한 ILB',
    description: '초보 육아러들을 위한 따뜻한 서비스',
    openGraph: {
        title: 'ILB - 🧸회원가입',
        description: '초보 육아러들을 위한 따뜻한 서비스',
        url: '/signup',
        images: {
            url: '/logo_bg.svg',
        },
    },
};

export default function SignupLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
