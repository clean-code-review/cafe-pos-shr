import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { toggleIsModalOpen } from "../../store/modalSlice";
import { RootState } from "../../store/store";

function Modal() {
  const dispatch = useDispatch();
  const { modalContent } = useSelector((state: RootState) => state.modal);

  const closeModal = () => {
    dispatch(toggleIsModalOpen(false));
  };

  return (
    <Wrap>
      <Background onClick={closeModal} />
      <ContentWrap>{modalContent}</ContentWrap>
    </Wrap>
  );
}

export default Modal;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const ContentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  min-width: 300px;
  min-height: 200px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;
