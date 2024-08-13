export interface BabyData {}

export interface BabyForm {
    name: string;
    month: string;
    birth: string;
    height: string;
    weight: string;
    gender: string;
}

export interface RemakeBabyForm {
    extra: {
        baby: BabyForm;
    };
}

export type Gender = 'man' | 'girl';

export interface GrowType {
    weight: number;
    height: number;
    date: string;
}

export interface BabyInfoData {
    name: string;
    month: string;
    birth: string;
    grow: GrowType[];
    gender: Gender;
}
