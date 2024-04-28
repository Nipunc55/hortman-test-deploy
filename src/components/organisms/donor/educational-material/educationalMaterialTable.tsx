import TableHeader from "../../../molecules/donor/educationalMaterial/tables/headers/tableHeader";
import TableRows from "../../../molecules/donor/educationalMaterial/tables/rows/tableRows";

const EducationalMaterialTable = () => {
  return (
    <div className="bg-tableBg w-full py-5 rounded-xl shadow-lg my-5 mb-4 min-h-[1100px] ">
      <TableHeader />
      <TableRows />
    </div>
  );
};

export default EducationalMaterialTable;
