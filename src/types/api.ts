export interface IOption {
  name: string;
  price?: number;
}

export interface IMenuItem {
  categoryId: string;
  name: string;
  price: number;
  option?: IOption[];
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IRateCoupon {
  id: string;
  type: "amount";
  name: "금액 할인";
  price: number;
}

export interface IPriceCoupon {
  id: string;
  type: "rate";
  name: "비율 할인";
  price: number;
}

export type ICoupon = IRateCoupon | IPriceCoupon;

export interface IResponse<T> {
  data: T;
}
