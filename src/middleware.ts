import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export default async function middleware(request: NextRequest) {
    console.log('미들웨어 호출', request.nextUrl.href);

    const session = await auth();
    const user = session?.user;
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
        if (user) {
            // 로그인 된 상태에서 login 페이지나 signup 페이지에 접근했을 경우
            return NextResponse.redirect(`${request.nextUrl.origin}/`);
        }
    } else if (
        pathname.startsWith('/mypage') ||
        pathname.startsWith('/order')
    ) {
        if (!session?.user) {
            // 로그인 되지 않은 상태에서 mypage 페이지나 order 페이지에 접근했을 경우
            return NextResponse.redirect(`${request.nextUrl.origin}/login`);
        }
    } else if (
        request.nextUrl.pathname.startsWith('/notice') &&
        session?.user.type !== 'admin'
    ) {
        // 공지사항 글작성 페이지에 관리자가 아닌 일반 유저가 접근한 경우
        return NextResponse.redirect(`${request.nextUrl.origin}`);
    }

    // pathname 저장
    const headers = new Headers(request.headers);
    headers.set('x-current-path', pathname);

    return NextResponse.next({ headers });
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/mypage/:path*',
        '/order/:path*',
        '/:type/new',
    ],
};
