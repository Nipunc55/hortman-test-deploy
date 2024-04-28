import {
  type BarChartDataReturnType,
  type GraphTraverseTypes
} from "../../../types/chartDataTypes";
import { months } from "../../constants/data";

const BarchartOptionsConfig = (
  datasets: BarChartDataReturnType,
  index: GraphTraverseTypes
) => {
  return {
    grid: {
      top: "5%",
      left: "15%",
      right: "2%"
    },
    itemStyle: {
      borderRadius: 5
    },
    legend: {
      show: false,
      data: datasets?.labels,
      textStyle: {
        color: "#000"
      },
      orient: "horizontal",
      top: "center"
    },
    tooltip: {
      show: false
    },
    barMaxWidth: "10px",
    series: datasets?.data,
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
    height: 130
  };
};

export default BarchartOptionsConfig;
