import { useState } from "react";
import { type GraphTraverseTypes } from "../../types/chartDataTypes";

const useTraverseMonthGraph = () => {
  const [monthIndex, setMonthIndex] = useState<GraphTraverseTypes>({
    min: new Date().getMonth() > 5 ? 6 : 0,
    max: new Date().getMonth() > 5 ? 11 : 5
  });

  const moveChart = (direction: "LEFT" | "RIGHT"): void => {
    if (direction === "LEFT") {
      setMonthIndex((prev) => ({
        min: prev.min - 6,
        max: prev.max - 6
      }));
    } else if (direction === "RIGHT") {
      setMonthIndex((prev) => ({
        min: prev.min + 6,
        max: prev.max + 6
      }));
    }
  };
  return { monthIndex, moveChart };
};

export default useTraverseMonthGraph;
