import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET!,
        salt: process.env.NEXTAUTH_SALT!,
    });

    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
        if (token) {
            // 로그인 된 상태에서 login 페이지나 signup 페이지에 접근했을 경우
            return NextResponse.redirect(`${req.nextUrl.origin}/`);
        }
    } else if (
        pathname.startsWith('/mypage') ||
        pathname.startsWith('/order')
    ) {
        if (!token) {
            // 로그인 되지 않은 상태에서 mypage 페이지나 order 페이지에 접근했을 경우
            return NextResponse.redirect(`${req.nextUrl.origin}/login`);
        }
    }
}
