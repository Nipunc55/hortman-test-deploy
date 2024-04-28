import React, { useEffect, useState } from "react";
import ChartsLayout from "../ChartsLayout";
import ReactECharts from "echarts-for-react";
import { graphic } from "echarts";
import ChartLegends from "../ChartLegends";
import { t } from "i18next";
import useTraverseMonthGraph from "../../../../../../utils/hooks/useTraverseMonthGraph";
import {
  type BarChartDataReturnType,
  type ChartLegendType
} from "../../../../../../types/chartDataTypes";
import BarchartOptionsConfig from "../../../../../../utils/components/echarts/barchartOptions";
import { getApplicantChart } from "../../../../../../api/analytic";

const ApplicantDataChart: React.FC = () => {
  const { monthIndex } = useTraverseMonthGraph();
  const [completed, setCompleted] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]);

  const [pending, setPending] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]);
  const datasets = [
    {
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
      data: completed,
      emphasis: {
        focus: "series"
      },
      type: "bar",
      name: "Completed"
    },
    {
      color: "#EFE8D8",
      data: pending,
      emphasis: {
        focus: "series"
      },
      type: "bar",
      name: "Pending"
    }
  ];

  const chartData = {
    data: datasets,
    labels: [t("completed"), t("pending")]
  };

  const formatChartLegends = (
    data: BarChartDataReturnType
  ): ChartLegendType[] => {
    return data.labels.map((item, index) => {
      return {
        name: item,
        color: index === 0 ? "#9A793D" : "#EFE8D8"
      };
    });
  };

  const loadApplicantDataChart = async () => {
    const { apiSuccess }: any = await getApplicantChart();
    if (apiSuccess) {
      const completedArray: number[] = [];
      const pendingArray: number[] = [];
      Object.keys(apiSuccess.data.data).forEach((key) => {
        completedArray.push(apiSuccess.data.data[key].completed);
        pendingArray.push(apiSuccess.data.data[key].pending);
      });
      setCompleted(completedArray);
      setPending(pendingArray);
    }
  };

  useEffect(() => {
    void loadApplicantDataChart();
  }, []);

  return (
    <div className="">
      <ChartsLayout>
        <div className="flex flex-col">
          <span className="text-base font-medium">
            {t("no. Of applicants")}
          </span>
          <div className="h-[180px]">
            <ReactECharts
              option={BarchartOptionsConfig(chartData, monthIndex)}
            />
          </div>
          <ChartLegends data={formatChartLegends(chartData)} />
        </div>
      </ChartsLayout>
    </div>
  );
};

export default ApplicantDataChart;
