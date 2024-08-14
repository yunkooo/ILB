export interface BabyInputForm {
    name: string;
    month: string;
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

export type Gender = 'man' | 'girl';

export interface GrowType {
    weight: string;
    height: string;
    date: string;
}

export interface BabyInfoData {
    name: string;
    month: string;
    birth: string;
    grow: GrowType[];
    gender: Gender;
}
