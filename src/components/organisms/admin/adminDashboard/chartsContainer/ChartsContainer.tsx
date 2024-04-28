import React from "react";
import ApplicantDataChart from "../../../../molecules/admin/adminDashboard/charts/barcharts/ApplicantDataChart";
import EligibilityCandidateChart from "../../../../molecules/admin/adminDashboard/charts/barcharts/EligibilityCandidateChart";
import KitDeliveryDataChart from "../../../../molecules/admin/adminDashboard/charts/barcharts/KitDeliveryDataChart";
import SalesActivityChart from "../../../../molecules/admin/adminDashboard/charts/linecharts/SalesActivityChart";

const ChartsContainer: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <ApplicantDataChart />
      <EligibilityCandidateChart />
      <KitDeliveryDataChart />
      <SalesActivityChart />
    </div>
  );
};

export default ChartsContainer;
