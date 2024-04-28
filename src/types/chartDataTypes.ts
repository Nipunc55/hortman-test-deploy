import { type graphic } from "echarts";

export type BarChartDataReturnType = {
  data: DataSeriesType[];
  labels: string[];
};

export type DataSeriesType = {
  name: string;
  type: string;
  data: number[];
  color: graphic.LinearGradient | string;
  emphasis: {
    focus: string;
  };
};

export type GraphTraverseTypes = {
  min: number;
  max: number;
};

export type ChartLegendReturnType = {
  data: ChartLegendType[];
};

export type ChartLegendType = {
  name: string;
  color: string;
};

export type LineChartDataReturnType = {
  data: LineDataSeriesType[];
};

export type LineDataSeriesType = {
  data: number[];
  type: string;
  lineStyle: {
    color: string | graphic.LinearGradient;
    type: string;
    width: number;
  };
  name: string;
  smooth: boolean;
};
