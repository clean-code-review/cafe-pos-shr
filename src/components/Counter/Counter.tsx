import { styled } from "styled-components";

interface IProps {
  count: number;
  decreaseCount: () => void;
  increaseCount: () => void;
}

function Counter({ count, decreaseCount, increaseCount }: IProps) {
  return (
    <CounterContainer>
      <button type="button" onClick={decreaseCount}>
        -
      </button>
      <span>{count}</span>
      <button type="button" onClick={increaseCount}>
        +
      </button>
    </CounterContainer>
  );
}

export default Counter;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  justify-content: space-between;

  span {
    font-size: 16px;
    width: 50px;
    text-align: center;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: palegreen;
    padding: 5px 5px 9px 5px;
    border-radius: 50%;
    font-size: 26px;
  }
`;
