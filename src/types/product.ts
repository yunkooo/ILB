import { SellerData } from './user';

export interface Product {
    //! FIXME - 실제 데이터에 맞게 타입 변경 필요
    _id: number;
    step: number;
    name: string;
    image: string;
    active: boolean;
    show: boolean;
    quantity: number;
    buyQuantity: number;
    seller: SellerData;
    replies: number;
    bookmarks: number;
    options: number;
    category: string[];
    mainImages: any;
}
