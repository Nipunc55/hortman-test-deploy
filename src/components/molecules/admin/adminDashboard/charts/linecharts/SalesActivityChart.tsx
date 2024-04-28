import React, { useEffect, useState } from "react";
import ChartsLayout from "../ChartsLayout";
import ReactECharts from "echarts-for-react";
import { type EChartsOption, graphic } from "echarts";
import { t } from "i18next";
import LineChartOptionConfigs from "../../../../../../utils/components/echarts/lineChartOptions";
import useTraverseMonthGraph from "../../../../../../utils/hooks/useTraverseMonthGraph";
import { getSalesChart } from "../../../../../../api/analytic";

const SalesActivityChart: React.FC = () => {
  const { monthIndex } = useTraverseMonthGraph();
  const [salesChartData, setSalesChartData] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]);
  const dataset = [
    {
      data: salesChartData,
      type: "line",
      lineStyle: {
        color: new graphic.LinearGradient(0, 1, 1, 1, [
          {
            offset: 0,
            color: "#9A793D"
          },
          {
            offset: 1,
            color: "#FFDA91"
          }
        ]),
        type: "solid",
        width: 3
      },
      itemStyle: {
        color: "#9A793D",
        borderType: "solid"
      },
      name: "Sales",
      smooth: false
    }
  ];
  const chartData = {
    data: dataset
  };

  const loadApplicantDataChart = async () => {
    const { apiSuccess }: any = await getSalesChart();
    if (apiSuccess) {
      const salesArray: number[] = [];
      Object.keys(apiSuccess.data.data).forEach((key) => {
        salesArray.push(apiSuccess.data.data[key]);
      });
      setSalesChartData(salesArray);
    }
  };

  useEffect(() => {
    void loadApplicantDataChart();
  }, []);
  return (
    <div className="">
      <ChartsLayout>
        <div className="flex flex-col">
          <span className="text-base font-medium">{t("sales-activity")}</span>
        </div>
        <div className="">
          <ReactECharts
            option={
              LineChartOptionConfigs(chartData, monthIndex) as EChartsOption
            }
          />
        </div>
      </ChartsLayout>
    </div>
  );
};

export default SalesActivityChart;
