import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { getCategoryList } from "../../api/fetcher";
import CategoryButton from "./CategoryButton";
import { changeCategoryId, setFirstCategoryId } from "../../store/categorySlice";
import Spinner from "../Spinner/Spinner";

function Category() {
  const { data, isLoading, errorMessage } = useFetch(getCategoryList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;
    dispatch(setFirstCategoryId(data[0]?.id));
    dispatch(changeCategoryId(data[0]?.id));
  }, [data, dispatch]);

  if (isLoading) return <Spinner />;
  if (errorMessage) return <h1>{errorMessage}</h1>;

  return (
    <CategoryListWrap>
      <CategoryList>
        {data?.map(category => <CategoryButton key={category.id} category={category} />)}
      </CategoryList>
    </CategoryListWrap>
  );
}

export default Category;

const CategoryListWrap = styled.div`
  padding: 15px;
  border-bottom: 2px solid black;
`;

const CategoryList = styled.div`
  display: flex;
  overflow-y: scroll;
  column-gap: 10px;
`;
