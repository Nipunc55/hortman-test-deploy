import React, { useEffect, useState } from "react";
import ChartsLayout from "../ChartsLayout";
import { graphic } from "echarts";
import ReactECharts from "echarts-for-react";
import ChartLegends from "../ChartLegends";
import { t } from "i18next";
import useTraverseMonthGraph from "../../../../../../utils/hooks/useTraverseMonthGraph";
import {
  type BarChartDataReturnType,
  type ChartLegendType
} from "../../../../../../types/chartDataTypes";
import BarchartOptionsConfig from "../../../../../../utils/components/echarts/barchartOptions";
import { getEligibleCandidateChartData } from "../../../../../../api/analytic";

const EligibilityCandidateChart: React.FC = () => {
  const { monthIndex } = useTraverseMonthGraph();
  const [rejected, setRejected] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]);
  const [eligible, setEligible] = useState<number[]>([
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
      data: eligible,
      emphasis: {
        focus: "series"
      },
      type: "bar",
      name: "Eligible"
    },
    {
      color: "#EFE8D8",
      data: rejected,
      emphasis: {
        focus: "series"
      },
      type: "bar",
      name: "Rejected"
    }
  ];

  const chartData = {
    data: datasets,
    labels: [t("eligible"), t("rejected")]
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

  const loadEligibleDataChart = async () => {
    const { apiSuccess }: any = await getEligibleCandidateChartData();
    if (apiSuccess) {
      const eligibleArray: number[] = [];
      const rejectedArray: number[] = [];
      Object.keys(apiSuccess.data.data).forEach((key) => {
        eligibleArray.push(apiSuccess.data.data[key].completed);
        rejectedArray.push(apiSuccess.data.data[key].rejected);
      });
      setEligible(eligibleArray);
      setRejected(rejectedArray);
    }
  };

  useEffect(() => {
    void loadEligibleDataChart();
  }, []);
  return (
    <div>
      <ChartsLayout>
        <div className="flex flex-col">
          <span className="text-base font-medium">
            {t("no. Of eligible candidates")}
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
export default EligibilityCandidateChart;
