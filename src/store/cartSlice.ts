/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IMenuItem, IOption } from "../types/api";
import isSameMenuOption from "../utils/menu";

export interface CartMenu {
  menu: IMenuItem;
  count: number;
  selectedOptions?: IOption[];
}

export interface CartState {
  inCartMenus: CartMenu[];
}

const initialState: CartState = {
  inCartMenus: [],
};

export const cartSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addMenuInCart: (
      state,
      action: PayloadAction<{ targetMenu: CartMenu; isCountChange?: boolean }>,
    ) => {
      const sameItemIndex = state.inCartMenus.findIndex(menuItem =>
        isSameMenuOption(menuItem, action.payload.targetMenu),
      );

      if (sameItemIndex === -1) {
        state.inCartMenus.push(action.payload.targetMenu);
      } else if (action.payload.isCountChange) {
        state.inCartMenus[sameItemIndex].count = action.payload.targetMenu.count;
      } else {
        state.inCartMenus[sameItemIndex].count += action.payload.targetMenu.count;
      }
    },
    deleteCartItem: (state, action: PayloadAction<CartMenu>) => {
      const sameItemIndex = state.inCartMenus.findIndex(menuItem =>
        isSameMenuOption(menuItem, action.payload),
      );

      if (sameItemIndex === -1) return;
      state.inCartMenus.splice(sameItemIndex, 1);
    },
    changeMenuInCart: (
      state,
      action: PayloadAction<{ afterMenu: CartMenu; beforeMenu: CartMenu }>,
    ) => {
      const { afterMenu, beforeMenu } = action.payload;

      const sameBeforeItemIndex = state.inCartMenus.findIndex(menuItem =>
        isSameMenuOption(menuItem, beforeMenu),
      );

      if (sameBeforeItemIndex === -1) return;
      state.inCartMenus.splice(sameBeforeItemIndex, 1);

      const sameAfterItemIndex = state.inCartMenus.findIndex(menuItem =>
        isSameMenuOption(menuItem, afterMenu),
      );

      if (sameAfterItemIndex === -1) {
        state.inCartMenus.push(afterMenu);
      } else {
        state.inCartMenus[sameAfterItemIndex].count += afterMenu.count;
      }
    },
    initializeCart: state => {
      state.inCartMenus = initialState.inCartMenus;
    },
  },
});

export const { addMenuInCart, deleteCartItem, changeMenuInCart, initializeCart } =
  cartSlice.actions;

export default cartSlice.reducer;
