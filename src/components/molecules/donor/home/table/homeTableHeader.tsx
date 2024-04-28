// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  PrimaryTypo,
  TableHeaderSecondary
} from "../../../../atoms/donor/typo";
// import StatsButton from "../../../../atoms/donor/buttons/StatsButton";

const HomeTableHeader = ({
  userName,
  hclId
}: {
  userName: any;
  hclId: any;
}) => {
  // const navigate = useNavigate();
  // const handleClick = () => {
  //   navigate("/donor/stem-cell-packages");
  // };
  const { t } = useTranslation();
  return (
    <div className="w-full flex justify-between items-center px-10 py-12 border-b border-secondary">
      <div className="flex flex-col gap-px items-start">
        <PrimaryTypo typo={t("welcome")} />
        <TableHeaderSecondary typo={userName} />
      </div>
      <div className="flex  flex-col ">
        <div>HSCL Donor No:</div>

        <div className="text-primary"> {hclId}</div>
        {/* <StatsButton text={t("current-status")} onClick={handleClick} /> */}
      </div>
    </div>
  );
};

export default HomeTableHeader;
