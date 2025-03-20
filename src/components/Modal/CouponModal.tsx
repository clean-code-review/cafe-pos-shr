import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { ICoupon } from "../../types/api";
import { toggleIsModalOpen } from "../../store/modalSlice";
import { changeSelectedCoupon } from "../../store/couponSlice";

interface IProps {
  coupon: ICoupon;
}

function CouponModal({ coupon }: IProps) {
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(toggleIsModalOpen(false));
  };

  const handleApply = () => {
    dispatch(changeSelectedCoupon(coupon));
    dispatch(toggleIsModalOpen(false));
  };

  return (
    <Container>
      <p>
        쿠폰은 중복사용이 불가능 합니다. <br />
        해당 쿠폰 선택시 기존 쿠폰이 해제됩니다. <br />
        선택하신 쿠폰을 적용하시겠습니까?
      </p>
      <ButtonWrap>
        <button type="button" onClick={handleCancel}>
          취소
        </button>
        <button type="button" onClick={handleApply}>
          적용
        </button>
      </ButtonWrap>
    </Container>
  );
}

export default CouponModal;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  height: 100%;

  p {
    text-align: center;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  column-gap: 5px;

  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff6a9;
    border-radius: 8px;
    padding: 10px;
  }
`;
