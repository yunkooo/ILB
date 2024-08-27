import NextAuth, { CredentialsSignin } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import googleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { loginOAuth, signupWithOAuth } from './data/actions/authAction';
import { BabyInfoData, OAuthUser, UserData } from './types';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.DB_NAME;
const { AUTH_SECRET } = process.env;

// OAuth2.0
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            // email/password 로그인
            async authorize(credentials) {
                // 사용자가 입력한 정보를 이용해서 로그인 처리
                const res = await fetch(`${SERVER}/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'client-id': `${CLIENT_ID}`,
                    },
                    body: JSON.stringify(credentials),
                });

                const resJson = await res.json();

                if (resJson.ok) {
                    const user = resJson.item;
                    console.log(user);
                    return {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        type: user.type,
                        phone: user.phone,
                        address: user.address,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        image: user.profileImage && SERVER + user.profileImage,
                        extra: user.extra,
                        accessToken: user.token.accessToken,
                        refreshToken: user.token.refreshToken,
                    };
                }
                throw new CredentialsSignin(resJson.message, {
                    cause: resJson,
                });

                return null;
            },
        }),
        googleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: 'jwt', // default 'jwt'
        maxAge: 60 * 60 * 24,
    },
    pages: {
        signIn: '/login', // default '/auth/signin'
    },
    secret: AUTH_SECRET,
    callbacks: {
        // 로그인 처리를 계속 할지 여부 결정
        // true를 리턴하면 로그인 처리를 계속하고 false를 리턴하거나 Error를 throw하면 로그인 흐름을 중단
        // user: authorize()가 리턴한 값
        async signIn({ user, account }) {
            // user에 들어 있는 사용자 정보를 이용해서 최초에 한번은 회원 DB에 저장(회원가입)
            // 가입된 회원일 경우 자동으로 로그인 처리
            switch (account?.provider) {
                case 'credentials':
                    break;
                case 'google':
                case 'github':
                case 'discord':
                    // DB에서 id를 조회해서 있으면 로그인 처리를 없으면 자동 회원 가입 후 로그인 처리
                    let userInfo: UserData | null = null;

                    try {
                        const newUser: OAuthUser = {
                            type: 'user',
                            loginType: account.provider,
                            name: user.name || '',
                            email: user.email || '',
                            profileImage: user.image || '',
                            extra: {
                                providerAccountId: account.providerAccountId,
                            },
                        };

                        await signupWithOAuth(newUser);

                        // 자동 로그인
                        const resData = await loginOAuth(
                            account.providerAccountId,
                        );
                        if (resData.ok) {
                            userInfo = resData.item;
                        } else {
                            return resData.message;
                        }
                    } catch (err) {
                        console.log(err);
                        throw err;
                    }

                    user.id = String(userInfo?._id);
                    user.type = userInfo?.type as string;
                    user.accessToken = userInfo?.token!.accessToken as string;
                    user.refreshToken = userInfo?.token!.refreshToken as string;
                    user.providerAccountId = userInfo?.extra
                        .providerAccountId as string;

                    break;
            }

            return true;
        },

        // 로그인 성공한 회원 정보로 token 객체 설정
        // 최초 로그인시 user 객체 전달,
        async jwt({ token, user }) {
            // 토큰 만료 체크, refreshToken으로 accessToken 갱신
            // refreshToken도 만료되었을 경우 로그아웃 처리
            if (user) {
                token.id = user.id;
                token.type = user.type;
                token.email = user.email;
                token.phone = user.phone;
                token.address = user.address;
                token.extra = user.extra;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.providerAccountId = user.providerAccountId ?? null;
                token.image = user.image;
            }

            return token;
        },

        // 클라이언트에서 세션 정보 요청시 호출
        // token 객체 정보로 session 객체 설정
        async session({ session, token }) {
            if (session && token) {
                session.user.id = token.id as string;
                session.user.type = token.type as string;
                session.user.email = token.email as string;
                session.user.phone = token.phone as string;
                session.user.address = token.address as string;
                session.user.image = token.image as string;
                const extra = token.extra as {
                    baby: BabyInfoData;
                    subscribe: boolean;
                    providerAccountId: string;
                };

                session.user.extra = {
                    providerAccountId: token.providerAccountId ?? null,
                    baby: extra?.baby,
                    subscribe: extra?.subscribe || false,
                };
                session.accessToken = token.accessToken;
                session.refreshToken = token.refreshToken;
            }

            return session;
        },
    },
});
