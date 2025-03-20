import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState } from "../../store/store";
import {
  calculateTotalCount,
  calculateTotalDiscount,
  calculateTotalPrice,
  formatPrice,
} from "../../utils/price";
import { setModalContent, toggleIsModalOpen } from "../../store/modalSlice";
import ReceiptModal from "../Modal/ReceiptModal";

function TotalPrice() {
  const {
    cart: { inCartMenus },
    coupon: { selectedCoupon },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const totalPrice = calculateTotalPrice(inCartMenus);
  const discountPrice = calculateTotalDiscount(totalPrice, selectedCoupon);
  const finalPrice = totalPrice - discountPrice;

  const handlePayment = () => {
    dispatch(toggleIsModalOpen(true));
    dispatch(setModalContent(<ReceiptModal />));
  };

  return (
    <ResultContainer>
      <SummarySection>
        <p>총 수량: {calculateTotalCount(inCartMenus)}개</p>
        <p>{`${formatPrice(totalPrice)} ${
          discountPrice ? `- ${formatPrice(discountPrice)}` : ""
        }`}</p>
      </SummarySection>
      <PaymentButton onClick={handlePayment} disabled={finalPrice <= 0}>
        결제하기 <strong>{formatPrice(finalPrice)}</strong>
      </PaymentButton>
    </ResultContainer>
  );
}

export default TotalPrice;

const ResultContainer = styled.div`
  height: 120px;
  width: 30%;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const SummarySection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
`;

const PaymentButton = styled.button`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 24px;

  strong {
    margin-left: 10px;
  }

  &:disabled {
    color: #ddd;
    cursor: not-allowed;
  }
`;
