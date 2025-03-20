/* eslint-disable import/no-cycle */
import { CartMenu } from "../store/cartSlice";
import { IOption } from "../types/api";

/**  */
export const isSameOptions = (options1: IOption[], options2: IOption[]) => {
  if (options1.length !== options2?.length) {
    return false;
  }

  if (options1?.length && options2?.length) {
    const optionSame = options1.every(
      option1 => options2?.some(option2 => option1.name === option2.name),
    );

    return optionSame;
  }

  return true;
};

/** 두 메뉴가 옵션까지 포함해서 동일한 메뉴인지 판별하는 함수 */
const isSameMenuOption = (menu1: CartMenu, menu2: CartMenu) => {
  if (menu1.menu.name !== menu2.menu.name) {
    return false;
  }

  if (!isSameOptions(menu1.selectedOptions || [], menu2.selectedOptions || [])) {
    return false;
  }

  return true;
};

export default isSameMenuOption;
