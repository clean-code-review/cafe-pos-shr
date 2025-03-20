import { useSelector } from "react-redux";
import { styled } from "styled-components";
import useFetch from "../../hooks/useFetch";
import { getMenuList } from "../../api/fetcher";
import { RootState } from "../../store/store";
import MenuCard from "./MenuCard";
import Spinner from "../Spinner/Spinner";

function MenuList() {
  const { currentCategoryId } = useSelector((state: RootState) => state.category);
  const { data, isLoading, errorMessage } = useFetch(
    getMenuList,
    [currentCategoryId],
    currentCategoryId,
  );

  if (isLoading) return <Spinner />;
  if (errorMessage) return <h1>{errorMessage}</h1>;

  return (
    <MenuListWrap>
      <MenuListContainer>
        {data?.map(menu => <MenuCard key={menu.name} menuData={menu} />)}
      </MenuListContainer>
    </MenuListWrap>
  );
}

export default MenuList;

const MenuListWrap = styled.div`
  padding: 15px;
  width: 100%;
  height: calc(100% - 74px);
`;

const MenuListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 15px;
  align-content: start;
  height: 100%;
  overflow-y: scroll;
`;
