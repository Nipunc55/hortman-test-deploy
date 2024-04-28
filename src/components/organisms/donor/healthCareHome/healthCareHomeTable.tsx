import TableHeader from "../../../molecules/donor/healthCareHomeTable/tableHeader";
import TableRow from "../../../molecules/donor/healthCareHomeTable/tableRow";

const HealthCareHomeTable = () => {
  return (
    <div className="bg-tableBg w-full py-5 rounded-xl shadow-lg my-5 mb-16 min-h-[525px] ">
      <TableHeader />
      <TableRow />
    </div>
  );
};

export default HealthCareHomeTable;
