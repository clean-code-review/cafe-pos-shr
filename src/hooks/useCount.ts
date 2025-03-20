import { useState } from "react";

function useCount(selectedCount?: number) {
  const [count, setCount] = useState(selectedCount || 1);

  const decreaseCount = () => {
    setCount(prev => Math.max(prev - 1, 0));
  };

  const increaseCount = () => {
    setCount(prev => Math.min(prev + 1, 100000));
  };

  return {
    count,
    decreaseCount,
    increaseCount,
  };
}

export default useCount;
