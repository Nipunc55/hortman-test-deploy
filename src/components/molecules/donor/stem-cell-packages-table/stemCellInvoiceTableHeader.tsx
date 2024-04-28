import { useNavigate } from "react-router-dom";

import { t } from "i18next";
import { TableTitle } from "../../../atoms/donor/typo";
import BasicButton from "../../../atoms/admin/buttons/BasicButton";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";

type StemCellInvoiceTableHeaderProps = {
  title: string;
  image: string;
  isLoading: boolean;
};
const StemCellInvoiceTableHeader = ({
  title,
  image,
  isLoading
}: StemCellInvoiceTableHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-6 border-b border-secondary">
      <div className=" flex flex-row justify-center items-center gap-5">
        {isLoading ? (
          <div className="flex flex-col m-auto justify-center items-center ">
            <LoaderIconSvg />
          </div>
        ) : (
          <img src={image} alt="" width={54} height={54} loading="lazy" />
        )}
        <TableTitle
          text={title}
          textSize="text-6xl"
          color="text-textSecondary"
        />
      </div>

      <div>
        <BasicButton
          styledBorderEnabled={false}
          onClick={() => {
            navigate("/donor/stem-cell-packages");
          }}
          text={`${t("back")}`}
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        />
      </div>
    </div>
  );
};

export default StemCellInvoiceTableHeader;
