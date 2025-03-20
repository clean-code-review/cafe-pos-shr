import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState } from "../../store/store";
import { changeCategoryId } from "../../store/categorySlice";
import { ICategory } from "../../types/api";

interface IProps {
  category: ICategory;
}

function CategoryButton({ category }: IProps) {
  const { currentCategoryId } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(changeCategoryId(e.currentTarget.id));
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      id={category.id}
      className={currentCategoryId === category.id ? "isActive" : ""}
    >
      {category.name}
    </Button>
  );
}

export default CategoryButton;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid black;
  flex-shrink: 0;

  &.isActive {
    background-color: lemonchiffon;
  }
`;
