/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CategoryState {
  currentCategoryId: string;
  firstCategoryId: string;
}

const initialState: CategoryState = {
  currentCategoryId: "",
  firstCategoryId: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setFirstCategoryId: (state, action: PayloadAction<string>) => {
      state.firstCategoryId = action.payload;
    },
    changeCategoryId: (state, action: PayloadAction<string>) => {
      state.currentCategoryId = action.payload;
    },
    initializeCategoryId: state => {
      state.currentCategoryId = state.firstCategoryId;
    },
  },
});

export const { setFirstCategoryId, changeCategoryId, initializeCategoryId } = categorySlice.actions;

export default categorySlice.reducer;
