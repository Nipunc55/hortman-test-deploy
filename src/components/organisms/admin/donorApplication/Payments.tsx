import DonorApplicationPaymentTableHeader from "../../../molecules/admin/donorApplicationPaymentTable/donorApplicationPaymentTableHeader";
import DonorApplicationPaymentTableRow from "../../../molecules/admin/donorApplicationPaymentTable/donorApplicationPaymentTableRow";

const Payments = () => {
  return (
    <div className="h-screen w-full">
      <DonorApplicationPaymentTableHeader />
      <DonorApplicationPaymentTableRow />
    </div>
  );
};

export default Payments;
