import { ColorRing } from "react-loader-spinner";
import { styled } from "styled-components";

function Spinner() {
  return (
    <SpinnerWrap>
      <ColorRing
        visible
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </SpinnerWrap>
  );
}

export default Spinner;

const SpinnerWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
