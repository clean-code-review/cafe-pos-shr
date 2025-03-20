import { products } from "../../common";

const productsData = {
  uri: "/products",
  handleResponse: () => {
    const data = products;

    return {
      data,
    };
  },
};

export default productsData;
