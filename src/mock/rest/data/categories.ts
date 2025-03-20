import { categories } from "../../common";

const categoriesData = {
  uri: "/categories",
  handleResponse: () => {
    const data = categories;

    return {
      data,
    };
  },
};

export default categoriesData;
