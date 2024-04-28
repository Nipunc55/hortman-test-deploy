import DonorApplicationReportForm from "./DonorApplicationForm";

const DonorDetails = ({ onTabChange }: { onTabChange: any }) => {
  return (
    <div className="w-full">
      <div className="w-full">
        <DonorApplicationReportForm onTabChange={onTabChange} />
      </div>
    </div>
  );
};

export default DonorDetails;
