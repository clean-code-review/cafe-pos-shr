import React from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { getCouponList } from "../../api/fetcher";
import { RootState } from "../../store/store";
import { changeSelectedCoupon } from "../../store/couponSlice";
import { ICoupon } from "../../types/api";
import { calculateTotalPrice, formatPrice } from "../../utils/price";
import { setModalContent, toggleIsModalOpen } from "../../store/modalSlice";
import CouponModal from "../Modal/CouponModal";
import Spinner from "../Spinner/Spinner";

function Coupon() {
  const { data, isLoading, errorMessage } = useFetch(getCouponList);
  const {
    coupon: { selectedCoupon },
    cart: { inCartMenus },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  if (isLoading) return <Spinner />;
  if (errorMessage) return <h1>{errorMessage}</h1>;

  const totalPrice = calculateTotalPrice(inCartMenus);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, coupon: ICoupon) => {
    if (!selectedCoupon) {
      dispatch(changeSelectedCoupon(coupon));
      return;
    }

    const isSameCoupon = selectedCoupon?.name === coupon.name;
    if (isSameCoupon) {
      dispatch(changeSelectedCoupon(coupon));
    } else {
      dispatch(toggleIsModalOpen(true));
      dispatch(setModalContent(<CouponModal coupon={coupon} />));
    }
  };

  const verifyCoupon = (coupon: ICoupon) => {
    if (!totalPrice) return true;
    if (coupon.type === "amount") {
      return totalPrice < coupon.price;
    }

    return false;
  };

  return (
    <CouponContainer>
      <Title>쿠폰</Title>
      <CouponList>
        {data?.map(coupon => (
          <CouponItem
            key={coupon.id}
            onClick={e => handleClick(e, coupon)}
            className={selectedCoupon?.name === coupon.name ? "isSelected" : ""}
            disabled={verifyCoupon(coupon)}
          >
            <p>{coupon.name}</p>
            <p>
              {coupon.type === "amount" && `${formatPrice(coupon.price)}`}
              {coupon.type === "rate" && `${coupon.price}%`}
            </p>
          </CouponItem>
        ))}
      </CouponList>
    </CouponContainer>
  );
}

export default Coupon;

const CouponContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CouponList = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const CouponItem = styled.button`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  border-radius: 8px;
  padding: 10px 20px;
  min-width: 100px;
  width: 100%;
  cursor: pointer;
  border: 1px solid black;

  p {
    width: 100%;
    text-align: center;
  }

  &.isSelected {
    background-color: lemonchiffon;
  }

  &:disabled {
    color: #ddd;
    cursor: not-allowed;
  }
`;
