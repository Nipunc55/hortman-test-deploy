import { type ChartLegendType } from "../../../../../types/chartDataTypes";

type props = {
  data: ChartLegendType[];
};
const ChartLegends = ({ data }: props) => {
  return (
    <div className="flex flex-row gap-4">
      {data.map((item, index) => {
        return (
          <div key={index} className="flex flex-row items-center gap-2">
            <div
              style={{
                backgroundColor: item.color
              }}
              className="h-4 w-4 rounded-md"
            ></div>
            <span className="text-xs font-normal">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChartLegends;
