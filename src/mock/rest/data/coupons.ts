import { coupons } from "../../common";

const couponsData = {
  uri: "/coupons",
  handleResponse: () => {
    const data = coupons;

    return {
      data,
    };
  },
};

export default couponsData;
