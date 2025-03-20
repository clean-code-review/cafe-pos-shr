import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { IMenuItem } from "../../types/api";
import { formatPrice } from "../../utils/price";
import { setModalContent, toggleIsModalOpen } from "../../store/modalSlice";
import OptionModal from "../Modal/OptionModal";

interface IProps {
  menuData: IMenuItem;
}

function MenuCard({ menuData }: IProps) {
  const dispatch = useDispatch();

  const handleMenuClick = () => {
    dispatch(toggleIsModalOpen(true));
    dispatch(setModalContent(<OptionModal selectedMenu={menuData} />));
  };

  return (
    <MenuCardContainer onClick={handleMenuClick}>
      <p>{menuData.name}</p>
      <p>{formatPrice(menuData.price)}</p>
    </MenuCardContainer>
  );
}

export default MenuCard;

const MenuCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  border-radius: 8px;
  padding: 20px 10px;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;
