import { useEffect, useState } from "react";
import { type singleNotificationTableRowType } from "../../../../types/notificationsTableRowType";
import i18n from "../../../../i18n";
import { Link } from "react-router-dom";

const TableRow = ({ data }: { data: singleNotificationTableRowType[] }) => {
  const [locale, setLocale] = useState(i18n.language);
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
  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput);

    const options: any = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };

    return inputDate.toLocaleDateString("en-US", options);
  };
  return (
    <>
      {data?.length > 0 ? (
        <>
          {data?.map((item: any) => (
            <>
              {item?.notification_type.toLowerCase() ===
              "eligibility acceptance" ? (
                <Link to={"/donor/eligible-screen"}>
                  <div
                    className=" max-h-[470px] hover:bg-gray-100"
                    key={item?._id}
                  >
                    <div className="flex flex-col gap-2.5 px-5 py-2.5 border-y border-secondary">
                      <div
                        className={`text-xs text-[#A7A7A7] font-normal flex ${
                          isArabic ? "justify-end" : "justify-start"
                        }`}
                      >
                        {getDateValue(item?.updated_at)}
                      </div>
                      <div
                        className={`text-xsxl font-normal flex ${
                          isArabic ? "justify-end" : "justify-start"
                        }`}
                      >
                        {item?.body}
                      </div>
                    </div>
                  </div>
                </Link>
              ) : item?.notification_type.toLowerCase() ===
                "payment reminder" ? (
                <Link to={"/donor/checkout"}>
                  <div className="max-h-[470px] hover:bg-gray-100 border-y border-secondary">
                    <div className="flex flex-col gap-2.5 px-5 py-2.5">
                      <div
                        className={`text-xs text-[#A7A7A7] font-normal flex ${
                          isArabic ? "justify-end" : "justify-start"
                        }`}
                      >
                        {getDateValue(item?.updated_at)}
                      </div>
                      <div
                        className={`text-xsxl font-normal flex ${
                          isArabic ? "justify-end" : "justify-start"
                        }`}
                      >
                        {/* {item?.notification_type} */}
                        {item?.body}
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className=" max-h-[470px]" key={item?._id}>
                  <div className="flex flex-col gap-2.5 px-5 py-2.5 border-y border-secondary">
                    <div
                      className={`text-xs text-[#A7A7A7] font-normal flex ${
                        isArabic ? "justify-end" : "justify-start"
                      }`}
                    >
                      {getDateValue(item?.updated_at)}
                    </div>
                    <div
                      className={`text-xsxl font-normal flex ${
                        isArabic ? "justify-end" : "justify-start"
                      }`}
                    >
                      {item?.notification_type}
                      {"  "}
                      {item?.body}
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
        </>
      ) : (
        <>
          <div className="w-full my-10 h-20">
            <p className="absolute text-center mx-auto italic right-0 left-0 w-full">
              There are no data to be displayed
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default TableRow;
