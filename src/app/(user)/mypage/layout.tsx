import BackHeader from '@/components/layout/BackHeader';

export default function MypageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <BackHeader />
            {children}
        </div>
    );
}
