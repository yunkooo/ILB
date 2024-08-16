import { BabyInfoData, GrowType } from './baby';

export interface UserData {
    _id: number;
    email: string;
    name: string;
    phone?: string;
    address?: string;
    type: 'user' | 'seller' | 'admin';
    loginType?: 'email' | 'kakao' | 'google' | 'naver';
    profileImage?: string;
    profile?: string;
    extra: {
        baby: BabyInfoData;
    };
    token?: {
        accessToken: string;
        refreshToken: string;
    };
    createdAt: string;
    updatedAt: string;
}

export type UserInToken = Required<Pick<UserData, '_id' | 'name'>> &
    Pick<UserData, 'profile'> & {
        accessToken: string;
        refreshToken: string;
    };

// export type UserForm = {
//     type: 'user' | 'seller';
//     name: string;
//     email: string;
//     attach?: string | string[];
//     profileImage?: string;
//     password: string;
//     // certificationCode: string;
// };

export interface UserSignUpForm {
    type: 'user' | 'seller';
    name: string;
    email: string;
    password: string;
    passwordCheck: string;
    phone: string;
    zoneCode: string;
    roadAddress: string;
    detailAddress: string;
    babyName: string;
    birth: string;
    height: string;
    weight: string;
    gender: 'man' | 'girl';
}

export interface UserForm {
    type: 'user' | 'seller';
    name: string;
    email: string;
    password: string;
    phone: string;
    zoneCode: string;
    roadAddress: string;
    detailAddress: string;
    extra: {
        baby: {
            name: string;
            gender: string;
            birth: string;
            grow: GrowType[];
        };
        subscribe: {
            status: string;
            date: string;
        };
    };
}

export type SellerData = Pick<
    UserData,
    '_id' | 'email' | 'name' | 'profileImage'
>;
