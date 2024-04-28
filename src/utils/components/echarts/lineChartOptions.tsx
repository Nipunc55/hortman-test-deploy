import {
  type LineChartDataReturnType,
  type GraphTraverseTypes
} from "../../../types/chartDataTypes";
import { months } from "../../constants/data";

const LineChartOptionConfigs = (
  datasets: LineChartDataReturnType,
  index: GraphTraverseTypes
) => {
  return {
    grid: {
      top: "5%",
      left: "15%",
      right: "2%"
    },
    legend: {
      show: false
    },
    xAxis: {
      type: "category",
      data: months,
      min: index.min,
      max: index.max,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        fontSize: 12,
        color: "#959DAD",
        fontFamily: "Jost"
      }
    },
    yAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#EFE8D8",
          opacity: 0.5
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: "#EFE8D8",
          opacity: 0.5
        }
      },
      axisLabel: {
        fontSize: 12,
        color: "#959DAD",
        fontFamily: "Jost",
        inside: true,
        margin: -30
      }
    },
    series: datasets.data,
    height: 160
  };
};

export default LineChartOptionConfigs;
