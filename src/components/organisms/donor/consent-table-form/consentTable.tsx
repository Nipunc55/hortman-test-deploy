import TableHeader from "../../../molecules/donor/consentForm/tableHeader";
import TableRow from "../../../molecules/donor/consentForm/tableRow";

const ConsentTable = () => {
  return (
    <div className="my-5">
      <div className="bg-white w-full rounded-xl shadow-lg">
        <TableHeader />
        <TableRow />
      </div>
    </div>
  );
};

export default ConsentTable;
