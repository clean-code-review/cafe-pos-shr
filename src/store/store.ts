/* eslint-disable import/no-named-as-default */
import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import modalSlice from "./modalSlice";
import cartSlice from "./cartSlice";
import couponSlice from "./couponSlice";

export const store = configureStore({
  reducer: {
    category: categorySlice,
    modal: modalSlice,
    cart: cartSlice,
    coupon: couponSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
