import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState } from "../../store/store";
import {
  calculateTotalDiscount,
  calculateTotalPrice,
  formatPrice,
  generateCalculationString,
} from "../../utils/price";
import { CartMenu, deleteCartItem } from "../../store/cartSlice";
import { initializeSelectedCoupon } from "../../store/couponSlice";
import { setModalContent, toggleIsModalOpen } from "../../store/modalSlice";
import OptionModal from "../Modal/OptionModal";

function CartList() {
  const {
    cart: { inCartMenus },
    coupon: { selectedCoupon },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, targetCartMenu: CartMenu) => {
    dispatch(deleteCartItem(targetCartMenu));
  };

  const handleCouponCancel = () => {
    dispatch(initializeSelectedCoupon());
  };

  const handleOptionChange = (e: React.MouseEvent<HTMLButtonElement>, targetCartMenu: CartMenu) => {
    dispatch(toggleIsModalOpen(true));
    dispatch(
      setModalContent(
        <OptionModal
          selectedMenu={targetCartMenu.menu}
          selectedOption={targetCartMenu.selectedOptions}
          selectedCount={targetCartMenu.count}
        />,
      ),
    );
  };

  return (
    <CartContainer>
      <Title>장바구니</Title>
      <CartContent>
        {inCartMenus.map(menu => (
          <CartItem key={menu.menu.categoryId}>
            <CartMenuInfo>
              <span>{menu.menu.name}</span>
              <div className="optionWrap">
                {menu.selectedOptions?.map(option => (
                  <span key={option.name}>
                    - {option.name} {option.price && `(+${formatPrice(option.price)})`}
                  </span>
                ))}
              </div>
              <small>
                {generateCalculationString(menu.menu, menu.selectedOptions || [], menu.count)}
              </small>
            </CartMenuInfo>
            <span>{menu.count}</span>
            <Button type="button" onClick={e => handleOptionChange(e, menu)}>
              옵션 변경
            </Button>
            <Button type="button" onClick={e => handleDelete(e, menu)}>
              삭제
            </Button>
          </CartItem>
        ))}
        {selectedCoupon && (
          <CouponItem>
            <CouponInfo>{selectedCoupon.name}</CouponInfo>
            <span>
              {`-${formatPrice(
                calculateTotalDiscount(calculateTotalPrice(inCartMenus), selectedCoupon),
              )}`}
            </span>
            <Button type="button" onClick={handleCouponCancel}>
              취소
            </Button>
          </CouponItem>
        )}
      </CartContent>
    </CartContainer>
  );
}

export default CartList;

const CartContainer = styled.div`
  padding: 20px;
  height: calc(100% - 150px - 120px);
  border-bottom: 2px solid black;
  border-top: 2px solid black;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CartContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 30px;
`;

const CartItem = styled.div`
  padding: 3px 0;
  display: flex;
  align-items: flex-start;
  column-gap: 10px;
  border-bottom: 1px solid black;

  .optionWrap {
    display: flex;
    flex-direction: column;
    row-gap: 1px;

    span {
      font-size: 14px;
    }
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 5px;
  flex-shrink: 0;
`;

const CouponItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;

  span {
    display: block;
    flex-shrink: 0;
  }
`;

const CartMenuInfo = styled.div`
  width: 100%;
`;

const CouponInfo = styled.p`
  width: 100%;
`;
