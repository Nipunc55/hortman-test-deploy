import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { TableTitle } from "../../../atoms/donor/typo";
import BasicButton from "../../../atoms/donor/buttons/BasicButton";

const StemCellTableHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-6 border-b border-secondary">
      <TableTitle
        text={`Your Package Details`}
        textSize="text-6xl"
        color="text-textSecondary"
      />
      <BasicButton
        styledBorderEnabled={false}
        onClick={() => {
          navigate("/quick-setup");
        }}
        text={`${t("choose-package")}`}
      />
    </div>
  );
};

export default StemCellTableHeader;
