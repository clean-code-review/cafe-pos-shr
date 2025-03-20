import { CartMenu } from "../store/cartSlice";
import { ICoupon, IMenuItem, IOption } from "../types/api";

export const formatPrice = (price: number) => {
  return `${price.toLocaleString()} 원`;
};

/**  */
export const calculateMenuPrice = (menu: IMenuItem, options: IOption[]) => {
  const menuPrice = menu.price;
  const optionsPrice = options.reduce((acc, option) => acc + (option.price || 0), 0) || 0;
  return menuPrice + optionsPrice;
};

/** 장바구니안에 담겨진 메뉴들의 최종 합산 가격을 반환하는 함수 */
export const calculateTotalPrice = (cartMenus: CartMenu[]) => {
  const totalPrice = cartMenus
    .map(({ menu, selectedOptions, count }) => {
      const menuPrice = calculateMenuPrice(menu, selectedOptions || []);
      return menuPrice * count;
    })
    .reduce((acc, menuPrice) => acc + menuPrice, 0);

  return totalPrice;
};

/** 최종적으로 적용된 할인 금액을 반환하는 함수 */
export const calculateTotalDiscount = (totalPrice: number, selectedCoupon: ICoupon | null) => {
  if (!selectedCoupon) return 0;
  return selectedCoupon.type === "rate"
    ? Math.ceil(totalPrice * (selectedCoupon.price / 100))
    : selectedCoupon.price;
};

/** 장바구니 메뉴들의 수량 합계를 반환하는 함수 */
export const calculateTotalCount = (cartMenus: CartMenu[]) => {
  const totalCount = cartMenus.reduce((acc, menu) => acc + menu.count, 0);

  return totalCount;
};

/** "선택한 메뉴의 최종가격 * 수량 = 메뉴의 최종 가격" 문자열을 반환하는 함수 */
export const generateCalculationString = (menu: IMenuItem, options: IOption[], count: number) => {
  const menuPrice = calculateMenuPrice(menu, options);
  const totalPrice = menuPrice * count;

  return `${menuPrice.toLocaleString()}원 x ${count}개 = ${totalPrice.toLocaleString()}원`;
};
