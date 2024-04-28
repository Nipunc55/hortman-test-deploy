import TableRow from "../../../molecules/donor/checkout-table/table-row";
import TableHeader from "../../../molecules/donor/checkout-table/tableHeader";

const CheckoutTable = () => {
  return (
    <div className="my-5">
      <div className="bg-white w-full rounded-xl shadow-lg min-h-[525px]">
        <TableHeader />
        <TableRow />
      </div>
    </div>
  );
};

export default CheckoutTable;
