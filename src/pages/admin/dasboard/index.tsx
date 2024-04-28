import CardsContainer from "../../../components/organisms/admin/adminDashboard/cardsContainer/CardsContainer";
import ChartsContainer from "../../../components/organisms/admin/adminDashboard/chartsContainer/ChartsContainer";
import ApplicationStatusTable from "../../../components/organisms/admin/tables/ApplicationStatusTable";

const Dasboard = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-5 py-5">
        <CardsContainer />
        <ApplicationStatusTable />
        <ChartsContainer />
      </div>
    </div>
  );
};

export default Dasboard;
