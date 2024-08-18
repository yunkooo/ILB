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
        [key: string]: any;
        // baby: BabyInfoData;
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

// 처음 회원가입 시 입력 받는 formData
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
    gender: 'boy' | 'girl';
}

// 회원가입시 fetch 전송 할때 사용하는 formData
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
        [key: string]: any;
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

// mypage - 회원정보 수정 시 formData
export type UserEdit = Pick<
    UserForm,
    'name' | 'type' | 'email' | 'phone' | 'password'
>;

export type SellerData = Pick<
    UserData,
    '_id' | 'email' | 'name' | 'profileImage'
>;

export type OAuthUser = Required<Pick<UserData, 'type' | 'loginType'>> &
    Partial<Pick<UserData, 'name' | 'email' | 'profileImage' | 'extra'>>;
