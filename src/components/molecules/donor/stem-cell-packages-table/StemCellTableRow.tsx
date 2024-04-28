import { Button } from "@material-tailwind/react";
import Package from "../../../../assets/images/package.svg";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { type singleStemCellPackageType } from "../../../../types/stemCellPackageType";
import i18n from "../../../../i18n";
import TrackIcon from "../../../../assets/svg/trackIcon";
import ProgressBar from "../../../atoms/donor/progress-bar/ProgressBar";

const StemCellTableRow = ({ data }: { data: singleStemCellPackageType }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string[]>([
    "pending",
    "pending",
    "pending",
    "pending",
    "pending",
    "pending",
    "pending"
  ]);
  const [locale, setLocale] = useState(i18n.language);
  const isArabic = locale === "ar";
  useEffect(() => {
    const x = {
      donor_information:
        data?.application_status?.donor_information ?? "pending",
      eligibility_assessment:
        data?.application_status?.eligibility_assessment ?? "pending",
      kit_status: data?.application_status?.kit_status ?? "pending",
      medical_questionnaire:
        data?.application_status?.medical_questionnaire ?? "pending",
      payments: data?.application_status?.payments ?? "pending",
      storage_certificate:
        data?.application_status?.storage_certificate ?? "pending",
      umbilical_cord_unit_status:
        data?.application_status?.umbilical_cord_unit_status ?? "pending"
    };

    // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
    const sortedStatus: string[] = Object.values(x).sort();
    sortedStatus.sort((a, b) => {
      if (a === "pending" && b !== "pending") {
        return 1;
      } else if (a !== "pending" && b === "pending") {
        return -1;
      } else {
        return 0;
      }
    });
    setStatus(sortedStatus);
  }, []);

  useEffect(() => {
    const updateLocale = () => {
      setLocale(i18n.language);
    };

    i18n.on("languageChanged", updateLocale);

    return () => {
      i18n.off("languageChanged", updateLocale);
    };
  }, []);
  return (
    <div className="w-full">
      <div className="w-full justify-between flex ">
        {/* {data.map((item) => ( */}
        <div
          className={`flex px-6 pt-14 w-full items-start  ${
            isArabic ? "flex-row-reverse" : "flex-row"
          }`}
          key={data?._id}
        >
          <img
            src={data?.package?.image ?? Package}
            alt="package"
            className="w-[80px] h-[80px]"
          />
          <div className="flex flex-col w-full ml-14 gap-4">
            <div className="flex flex-row">
              <div className="flex-[2] ">
                <div className="flex flex-col ">
                  <span className="text-[#636363] text-xsxl font-medium">
                    {t("package")}
                  </span>
                  <span className="text-base font-medium">
                    {data?.package?.name ?? ""}
                  </span>
                </div>
              </div>
              <div className="flex-[2] ">
                <div className="flex flex-col ">
                  <span className="text-[#636363] text-xsxl font-medium">
                    {t("donor-name")}
                  </span>
                  <span className="text-base font-medium">
                    {data?.user?.name ?? ""}
                  </span>
                </div>
              </div>
              <div className="flex-[2] ">
                <div className="flex flex-col ">
                  <span className="text-[#636363] text-xsxl font-medium">
                    {t("HSCL-id")}
                  </span>
                  <span className="text-base font-medium">
                    {data?.hscl_id ?? ""}
                  </span>
                </div>
              </div>
              <div className="flex-[2] ">
                <div className="flex flex-col ">
                  <span className="text-[#636363] text-xsxl font-medium">
                    {t("date")}
                  </span>
                  <span className="text-base font-medium ">
                    {data?.created_at?.slice(0, 10) ?? ""}
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col">
              <span className="text-[#636363] text-xsxl font-medium">
                {t("current-status")}
              </span>
              <span className="text-base font-medium">
                {data?.status ?? ""}
              </span>
            </div> */}
          </div>
          <div className="ml-[195px]">
            <Button
              placeholder={""}
              className="track-button-body flex items-center gap-2 "
              onClick={() =>
                navigate(`/donor/stem-cell-packages/tracker/${data?._id}`)
              }
            >
              <TrackIcon />
              {t("track")}
            </Button>
          </div>
        </div>
        {/* ))} */}
      </div>
      <div className="py-10 px-6 flex gap-1">
        <ProgressBar progress={status[0] !== "pending" ? 100 : 0} />
        <ProgressBar progress={status[1] !== "pending" ? 100 : 0} />
        <ProgressBar progress={status[2] !== "pending" ? 100 : 0} />
        <ProgressBar progress={status[3] !== "pending" ? 100 : 0} />
        <ProgressBar progress={status[4] !== "pending" ? 100 : 0} />
        <ProgressBar progress={status[5] !== "pending" ? 100 : 0} />
        <ProgressBar progress={status[6] !== "pending" ? 100 : 0} />
      </div>
    </div>
  );
};

export default StemCellTableRow;
