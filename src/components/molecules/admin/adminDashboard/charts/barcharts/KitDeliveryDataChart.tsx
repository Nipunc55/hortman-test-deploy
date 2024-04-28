import React, { useEffect, useState } from "react";
import ChartsLayout from "../ChartsLayout";
import { graphic } from "echarts";
import ChartLegends from "../ChartLegends";
import ReactECharts from "echarts-for-react";
import { t } from "i18next";
import {
  type BarChartDataReturnType,
  type ChartLegendType
} from "../../../../../../types/chartDataTypes";
import BarchartOptionsConfig from "../../../../../../utils/components/echarts/barchartOptions";
import useTraverseMonthGraph from "../../../../../../utils/hooks/useTraverseMonthGraph";
import { getDeliveryChart } from "../../../../../../api/analytic";

const KitDeliveryDataChart: React.FC = () => {
  const { monthIndex } = useTraverseMonthGraph();
  const [collected, setCollected] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]);

  const [delivered, setDelivered] = useState<number[]>([
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
      data: delivered,
      emphasis: {
        focus: "series"
      },
      type: "bar",
      name: "Delivered"
    },
    {
      color: "#EFE8D8",
      data: collected,
      emphasis: {
        focus: "series"
      },
      type: "bar",
      name: "Collected"
    }
  ];

  const chartData = {
    data: datasets,
    labels: [t("delivered"), t("collected")]
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

  const loaddeliveryDataChart = async () => {
    const { apiSuccess }: any = await getDeliveryChart();
    if (apiSuccess) {
      const collectedArray: number[] = [];
      const deliveredArray: number[] = [];
      Object.keys(apiSuccess.data.data).forEach((key) => {
        collectedArray.push(apiSuccess.data.data[key].collected);
        deliveredArray.push(apiSuccess.data.data[key].delivered);
      });
      setCollected(collectedArray);
      setDelivered(deliveredArray);
    }
  };

  useEffect(() => {
    void loaddeliveryDataChart();
  }, []);
  return (
    <div className="">
      <ChartsLayout>
        <div className="flex flex-col">
          <span className="text-base font-medium">
            {t("no. Of kit delivered/Collected")}
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

export default KitDeliveryDataChart;
