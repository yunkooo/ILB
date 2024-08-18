export interface BabyInputForm {
    providerAccountId: string;
    babyName: string;
    birth: string;
    height: string;
    weight: string;
    gender: Gender;
}

export interface RemakeBabyForm {
    extra: {
        baby: BabyInfoData;
    };
}

export type Gender = 'boy' | 'girl';

export interface GrowType {
    weight: string;
    height: string;
    date: string;
}

export interface BabyBodyInfo {
    grow: GrowType[];
}

export type BabyBody = Pick<GrowType, 'weight' | 'height'>;

export interface BabyInfoData {
    name: string;
    birth: string;
    grow: GrowType[];
    gender: Gender;
}
