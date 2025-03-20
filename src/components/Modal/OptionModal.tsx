/* eslint-disable react/require-default-props */
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { IMenuItem, IOption } from "../../types/api";
import { formatPrice } from "../../utils/price";
import Counter from "../Counter/Counter";
import useCount from "../../hooks/useCount";
import { toggleIsModalOpen } from "../../store/modalSlice";
import { CartMenu, addMenuInCart, changeMenuInCart } from "../../store/cartSlice";
import { isSameOptions } from "../../utils/menu";

interface IProps {
  selectedMenu: IMenuItem;
  selectedOption?: IOption[];
  selectedCount?: number;
}

function OptionModal({ selectedMenu, selectedOption, selectedCount }: IProps) {
  const { increaseCount, decreaseCount, count } = useCount(selectedCount);
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>(selectedOption || []);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(toggleIsModalOpen(false));
  };

  const handleAddMenu = () => {
    const cartMenu: CartMenu = {
      menu: selectedMenu,
      count,
      selectedOptions,
    };

    if (!selectedOption) {
      dispatch(addMenuInCart({ targetMenu: cartMenu }));
      dispatch(toggleIsModalOpen(false));
      return;
    }

    const sameOption = isSameOptions(selectedOptions, selectedOption);
    if (sameOption) {
      dispatch(addMenuInCart({ targetMenu: cartMenu, isCountChange: true }));
    } else {
      const beforeMenu: CartMenu = {
        menu: selectedMenu,
        count,
        selectedOptions: selectedOption,
      };
      dispatch(changeMenuInCart({ afterMenu: cartMenu, beforeMenu }));
    }
    dispatch(toggleIsModalOpen(false));
  };

  const handleAddOption = (targetOption: IOption) => {
    const option = selectedOptions.find(current => current.name === targetOption.name);
    if (!option) {
      setSelectedOptions(prev => [...prev, targetOption]);
    } else {
      const filteredOptions = selectedOptions.filter(
        currentOption => currentOption.name !== targetOption.name,
      );
      setSelectedOptions(filteredOptions);
    }
  };

  return (
    <Container>
      <Content>
        <MenuInfo>
          <img
            src="https://plus.unsplash.com/premium_photo-1671559021551-95106555ee19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
            alt="coffee"
          />
          <p>{selectedMenu.name}</p>
          <p>{formatPrice(selectedMenu.price)}</p>
          <Counter increaseCount={increaseCount} decreaseCount={decreaseCount} count={count} />
        </MenuInfo>
        {selectedMenu.option && (
          <OptionInfo>
            <h2>Options</h2>
            {selectedMenu.option?.map(option => (
              <Option
                key={option.name}
                onClick={() => handleAddOption(option)}
                className={selectedOptions.includes(option) ? "selected" : ""}
              >
                <p>
                  {option.name}
                  {option.price && <small>&nbsp;{`(+${formatPrice(option.price)})`}</small>}
                </p>
              </Option>
            ))}
          </OptionInfo>
        )}
      </Content>
      <Buttons>
        <button type="button" onClick={handleCancel}>
          이전
        </button>
        <button type="button" onClick={handleAddMenu}>
          담기
        </button>
      </Buttons>
    </Container>
  );
}

export default OptionModal;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 30px;
`;

const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;

  p {
    font-size: 18px;
    font-weight: 600;
  }

  img {
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
    max-height: 250px;
  }
`;

const OptionInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const Option = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  flex-shrink: 0;

  p {
    display: flex;
    align-items: center;
  }

  &.selected {
    background-color: lightpink;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  margin-top: 30px;

  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: forestgreen;
    padding: 10px;
    border-radius: 8px;
    color: white;
  }
`;
