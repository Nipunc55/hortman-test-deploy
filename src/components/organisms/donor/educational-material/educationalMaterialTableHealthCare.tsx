import TableHeader from "../../../molecules/donor/educationalMaterial/tables/headers/tableHeader";
import TableRowsHealthCare from "../../../molecules/donor/educationalMaterial/tables/rows/tableRowsHealthCare";

const EducationalMaterialTableHealthCare = () => {
  return (
    <div className="bg-tableBg w-full py-5 rounded-xl shadow-lg my-5 mb-16 min-h-[1100px] ">
      <TableHeader />
      <TableRowsHealthCare />
    </div>
  );
};

export default EducationalMaterialTableHealthCare;
