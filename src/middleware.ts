import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { actionUserData } from './data/actions/userAction';

export default async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET!,
        secureCookie: process.env.NODE_ENV === 'production',
        salt:
            process.env.NODE_ENV === 'production'
                ? '__Secure-authjs.session-token'
                : 'authjs.session-token',
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
        if (pathname.startsWith('/order') && !pathname.endsWith('complete')) {
            const {
                item: {
                    extra: { subscribe },
                },
            } = await actionUserData();

            if (subscribe.status === 'true') {
                return NextResponse.redirect(
                    `${req.nextUrl.origin}/mypage/subscribe`,
                );
            }
        }
    }
}
