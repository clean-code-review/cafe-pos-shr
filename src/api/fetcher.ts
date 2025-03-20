import axios from "axios";
import { ICategory, ICoupon, IMenuItem, IResponse } from "../types/api";

export const getCategoryList = async () => {
  const { data } = await axios.get<IResponse<ICategory[]>>("/categories");
  return data.data;
};

export const getCouponList = async () => {
  const { data } = await axios.get<IResponse<ICoupon[]>>("/coupons");
  return data.data;
};

export const getMenuList = async (categoryId: string) => {
  const { data } = await axios.get<IResponse<IMenuItem[]>>(`/products`);
  const categoryMenuList = data.data.filter(item => item.categoryId === categoryId);
  return categoryMenuList;
};
