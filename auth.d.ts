import { BabyForm, BabyInfoData } from '@/types';

export declare module '@auth/core/types' {
    /*
  export interface User {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  } 
  */

    interface User {
        phone?: string;
        address?: string;
        type: string;
        extra?: { baby: BabyInfoData | undefined; subscribe: boolean };
        accessToken: string;
        refreshToken: string;
    }

    interface Session {
        user: {
            _id: number;
            email: string;
            name: string;
            phone?: string;
            address?: string;
            type: string;
            loginType?: string;
            profileImage?: string;
            profile?: string;
            createdAt: string;
            updatedAt: string;
            extra: { baby: BabyInfoData; subscribe: boolean };
        };
        accessToken: string;
        refreshToken: string;
    }
}

export declare module '@auth/core/jwt' {
    interface JWT {
        accessToken: string;
        refreshToken: string;
    }
}
