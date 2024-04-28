import { useEffect, useState } from "react";
import i18n from "../../../../i18n";
import NotSelected from "../../../../assets/svg/notSelected";
import Tick from "../../../../assets/svg/tick";
import ProgressBar from "../../../atoms/donor/progress-bar/ProgressBar";

type statusTypes = {
  donor_information: string;
  eligibility_assessment: string;
  kit_status: string;
  medical_questionnaire: string;
  payments: string;
  storage_certificate: string;
  umbilical_cord_unit_status: string;
};

const StemCellInvoiceTableRow = ({
  hsclId,
  status
}: {
  status: statusTypes;
  hsclId: string;
}) => {
  const [locale, setLocale] = useState(i18n.language);
  const [sortedStatus, setSortedStatus] = useState<string[]>([
    "pending",
    "pending",
    "pending",
    "pending",
    "pending",
    "pending",
    "pending"
  ]);
  const isArabic = locale === "ar";
  useEffect(() => {
    const updateLocale = () => {
      setLocale(i18n.language);
    };

    i18n.on("languageChanged", updateLocale);

    return () => {
      i18n.off("languageChanged", updateLocale);
    };
  }, []);

  const CurrentStatus = [
    {
      id: "1",
      status: "Donor Information",
      statusArabic: "تاريخ شراء الحزمة",
      key: "donor_information"
    },
    {
      id: "2",
      status: "Medical Questionnaire",
      statusArabic: "تاريخ شراء الحزمة",
      key: "medical_questionnaire"
    },
    {
      id: "3",
      status: "Eligibility Assessment",
      statusArabic: "تاريخ شراء الحزمة",
      key: "eligibility_assessment"
    },
    {
      id: "4",
      status: "Payments",
      statusArabic: "تاريخ شراء الحزمة",
      key: "payments"
    },
    {
      id: "5",
      status: "Kit Status",
      statusArabic: "تاريخ شراء الحزمة",
      key: "kit_status"
    },
    {
      id: "6",
      status: "Umbilical Cord Unit Status",
      statusArabic: "تاريخ شراء الحزمة",
      key: "umbilical_cord_unit_status"
    },
    {
      id: "7",
      status: "Storage Certificate",
      statusArabic: "تاريخ شراء الحزمة",
      key: "storage_certificate"
    }
  ];

  useEffect(() => {
    const x = {
      donor_information: status.donor_information ?? "pending",
      eligibility_assessment: status.eligibility_assessment ?? "pending",
      kit_status: status.kit_status ?? "pending",
      medical_questionnaire: status.medical_questionnaire ?? "pending",
      payments: status.payments ?? "pending",
      storage_certificate: status.storage_certificate ?? "pending",
      umbilical_cord_unit_status: status.umbilical_cord_unit_status ?? "pending"
    };

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
    setSortedStatus(sortedStatus);
  }, []);

  return (
    <div className="border-t border-secondary">
      <div className="flex gap-2">
        <div className="w-full py-6 px-6">
          <div className="w-full">
            <div className="border-b border-secondary pb-1 mb-4 flex flex-col justify-between gap-[42px]">
              <div className="text-lg font-medium  text-primary">
                Unique Donor Id: {hsclId}
              </div>
              <div>
                <div className="text-2xl font-medium  text-primary">
                  Current Status
                </div>
                <div className="py-[14px] flex gap-1">
                  <ProgressBar
                    progress={sortedStatus[0] !== "pending" ? 100 : 0}
                  />
                  <ProgressBar
                    progress={sortedStatus[1] !== "pending" ? 100 : 0}
                  />
                  <ProgressBar
                    progress={sortedStatus[2] !== "pending" ? 100 : 0}
                  />
                  <ProgressBar
                    progress={sortedStatus[3] !== "pending" ? 100 : 0}
                  />
                  <ProgressBar
                    progress={sortedStatus[4] !== "pending" ? 100 : 0}
                  />
                  <ProgressBar
                    progress={sortedStatus[5] !== "pending" ? 100 : 0}
                  />
                  <ProgressBar
                    progress={sortedStatus[6] !== "pending" ? 100 : 0}
                  />
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-2">
              <div className="flex flex-row justify-between text-base font-medium text-primary">
                <span>Description</span>
                <span>Date</span>
              </div>
              <div>
                {CurrentStatus?.map((item) => (
                  <>
                    <div
                      className={`flex w-full justify-between pt-1.5  ${
                        isArabic ? "flex-row-reverse" : ""
                      }`}
                    >
                      {isArabic ? (
                        <div
                          className={`flex gap-2 ${
                            isArabic ? "flex-row-reverse" : ""
                          }`}
                        >
                          {Object.entries(status).find(
                            ([key]) => key === item.key
                          )?.[1] === "pending" ? (
                            <NotSelected />
                          ) : (
                            <Tick />
                          )}
                          <span
                            className="text-base font-medium "
                            style={{
                              color:
                                Object.entries(status).find(
                                  ([key]) => key === item.key
                                )?.[1] === "pending"
                                  ? "#636363"
                                  : "black"
                            }}
                          >
                            {item?.statusArabic ?? ""}
                          </span>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          {Object.entries(status).find(
                            ([key]) => key === item.key
                          )?.[1] === "pending" ? (
                            <NotSelected />
                          ) : (
                            <Tick />
                          )}
                          <span
                            className=" text-base font-medium"
                            style={{
                              color:
                                Object.entries(status).find(
                                  ([key]) => key === item.key
                                )?.[1] === "pending"
                                  ? "#636363"
                                  : "black"
                            }}
                          >
                            {item?.status ?? ""}
                          </span>
                        </div>
                      )}
                      <div
                        className={`${
                          Object.entries(status).find(
                            ([key]) => key === item.key
                          )?.[1] === "pending"
                            ? "? font-normal "
                            : "font-semibold"
                        } text-base`}
                        style={{
                          color:
                            Object.entries(status).find(
                              ([key]) => key === item.key
                            )?.[1] === "pending"
                              ? "#636363"
                              : "black"
                        }}
                      >
                        {
                          Object.entries(status).find(
                            ([key]) => key === item.key
                          )?.[1]
                        }
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StemCellInvoiceTableRow;
