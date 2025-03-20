/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICoupon } from "../types/api";

interface CouponState {
  selectedCoupon: null | ICoupon;
}

const initialState: CouponState = {
  selectedCoupon: null,
};

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    changeSelectedCoupon: (state, action: PayloadAction<ICoupon>) => {
      state.selectedCoupon = action.payload;
    },
    initializeSelectedCoupon: state => {
      state.selectedCoupon = initialState.selectedCoupon;
    },
  },
});

export const { changeSelectedCoupon, initializeSelectedCoupon } = couponSlice.actions;

export default couponSlice.reducer;
