import { styled } from "styled-components";
import { useSelector } from "react-redux";
import Coupon from "./components/Coupon/Coupon";
import MenuList from "./components/MenuList/MenuList";
import Category from "./components/Category/Category";
import CartList from "./components/CartList/CartList";
import Modal from "./components/Modal/Modal";
import { RootState } from "./store/store";
import TotalPrice from "./components/TotalPrice/TotalPrice";

function App() {
  const { isModalOpen } = useSelector((state: RootState) => state.modal);

  return (
    <main>
      <Wrap>
        <Container>
          <ContentSection>
            <Category />
            <MenuList />
          </ContentSection>
          <SidebarSection>
            <Coupon />
            <CartList />
            <TotalPrice />
          </SidebarSection>
        </Container>
      </Wrap>
      {isModalOpen && <Modal />}
    </main>
  );
}

export default App;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 20px;
`;

const Container = styled.div`
  position: relative;
  height: 100%;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  overflow: hidden;
  background-color: #fefefe;
`;

const ContentSection = styled.div`
  width: 70%;
  height: 100%;
  border-right: 2px solid black;
`;

const SidebarSection = styled.div`
  width: 30%;
  height: 100%;
`;
