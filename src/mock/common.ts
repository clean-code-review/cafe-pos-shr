/* eslint-disable @typescript-eslint/naming-convention */
import { ICategory, ICoupon, IMenuItem } from "../types/api";

const product_coffee: IMenuItem[] = [
  {
    categoryId: "coffee",
    name: "아메리카노",
    price: 1500,
    option: [
      {
        name: "연하게",
      },
      {
        name: "2샷",
        price: 500,
      },
    ],
  },
  {
    categoryId: "coffee",
    name: "헤이즐넛 아메리카노",
    price: 2000,
    option: [
      {
        name: "2샷",
        price: 500,
      },
    ],
  },
  {
    categoryId: "coffee",
    name: "허니 아메리카노",
    price: 2000,
    option: [
      {
        name: "2샷",
        price: 500,
      },
    ],
  },
  {
    categoryId: "coffee",
    name: "에스프레소",
    price: 1800,
  },
];

const product_milktea: IMenuItem[] = [
  {
    categoryId: "milktea",
    name: "얼그레이 밀크티",
    price: 3000,
    option: [
      {
        name: "두유로 변경",
      },
      {
        name: "2샷",
        price: 500,
      },
    ],
  },
  {
    categoryId: "milktea",
    name: "얼그레이 버블티",
    price: 3500,
    option: [
      {
        name: "2샷",
        price: 500,
      },
      {
        name: "버블 추가",
        price: 1000,
      },
      {
        name: "두유로 변경",
      },
    ],
  },
  {
    categoryId: "milktea",
    name: "딸기라떼",
    price: 4500,
  },
  {
    categoryId: "milktea",
    name: "초코라떼",
    price: 3500,
  },
  {
    categoryId: "milktea",
    name: "녹차라떼",
    price: 3500,
  },
  {
    categoryId: "milktea",
    name: "흑임자라떼",
    price: 3500,
    option: [
      {
        name: "두유로 변경",
      },
    ],
  },
];

const product_juice: IMenuItem[] = [
  {
    categoryId: "juice",
    name: "수박쥬스",
    price: 4000,
  },
  {
    categoryId: "juice",
    name: "딸기쥬스",
    price: 3500,
    option: [
      {
        name: "딸기 2배",
        price: 1000,
      },
    ],
  },
  {
    categoryId: "juice",
    name: "망고쥬스",
    price: 4500,
  },
  {
    categoryId: "juice",
    name: "복숭아쥬스",
    price: 3500,
  },
];

const product_desert: IMenuItem[] = [
  {
    categoryId: "desert",
    name: "딸기 마카롱",
    price: 2000,
  },
  {
    categoryId: "desert",
    name: "초코 마카롱",
    price: 2000,
  },
  {
    categoryId: "desert",
    name: "초코칩 쿠키",
    price: 1500,
  },
  {
    categoryId: "desert",
    name: "아몬드 쿠키",
    price: 1500,
  },
];

export const categories: ICategory[] = [
  {
    id: "coffee",
    name: "Coffee",
  },
  {
    id: "milktea",
    name: "Milk Tea",
  },
  {
    id: "juice",
    name: "Juice",
  },
  {
    id: "desert",
    name: "Desert",
  },
];

export const products = [
  ...product_coffee,
  ...product_milktea,
  ...product_juice,
  ...product_desert,
];

export const coupons: ICoupon[] = [
  {
    id: "coupon_1",
    type: "amount",
    name: "금액 할인",
    price: 3000,
  },
  {
    id: "coupon_2",
    type: "rate",
    name: "비율 할인",
    price: 10,
  },
];
