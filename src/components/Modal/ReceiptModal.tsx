import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState } from "../../store/store";
import {
  calculateTotalCount,
  calculateTotalDiscount,
  calculateTotalPrice,
  formatPrice,
  generateCalculationString,
} from "../../utils/price";
import { initializeCart } from "../../store/cartSlice";
import { initializeModal } from "../../store/modalSlice";
import { initializeSelectedCoupon } from "../../store/couponSlice";
import { initializeCategoryId } from "../../store/categorySlice";

function ReceiptModal() {
  const {
    cart: { inCartMenus },
    coupon: { selectedCoupon },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const totalPrice = calculateTotalPrice(inCartMenus);
  const discountPrice = calculateTotalDiscount(totalPrice, selectedCoupon);

  const handleClose = () => {
    dispatch(initializeCart());
    dispatch(initializeModal());
    dispatch(initializeCategoryId());
    dispatch(initializeSelectedCoupon());
  };

  return (
    <ReceiptContainer>
      <Title>주문내역</Title>
      <div>
        {inCartMenus.map(menu => (
          <OrderMenuItem key={menu.menu.categoryId}>
            <div>
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
            </div>
            <span>{menu.count}</span>
          </OrderMenuItem>
        ))}
      </div>
      <OrderSummary>
        <div>
          <p>{`${formatPrice(totalPrice)} ${
            discountPrice ? `- ${formatPrice(discountPrice)}` : ""
          }`}</p>
          <p>{calculateTotalCount(inCartMenus)}개</p>
        </div>
        <p>[ 총 결제금액 ] {formatPrice(totalPrice - discountPrice)}</p>
      </OrderSummary>
      <Button type="button" onClick={handleClose}>
        확인
      </Button>
    </ReceiptContainer>
  );
}

export default ReceiptModal;

const ReceiptContainer = styled.div`
  width: 100%;
  padding: 20px;
  height: 100%;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 26px;
  margin-bottom: 20px;
`;

const OrderMenuItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding-block: 5px;

  .optionWrap {
    display: flex;
    flex-direction: column;
    row-gap: 1px;

    span {
      font-size: 14px;
    }
  }
`;

const OrderSummary = styled.div`
  margin-top: 10px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  > p {
    font-weight: bold;
    font-size: 20px;
    border: 1px solid black;
    margin-block: 20px 10px;
    padding: 5px;
    border-radius: 8px;
  }
`;

const Button = styled.button`
  background-color: cadetblue;
  border-radius: 8px;
  padding: 10px 20px;
  color: white;
  float: right;
`;
