import { t } from "i18next";

const DonorApplicationReportsTableRow = ({ data }: { data: any }) => {
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
          {data.map((item: any) => (
            <div
              key={item._id}
              className="py-4  px-5 flex flex-row font-normal"
            >
              <div className="flex-[1] flex items-center">
                {getDateValue(item.created_at) ?? ""}
              </div>
              <div className="flex-[1.3] flex items-center gap-1">
                <span>{item?.package?.name ?? t("N/A")}</span>
              </div>
              <div className="flex-[1.5] flex items-center">
                {item?.user?.name ?? t("N/A")}
              </div>
              <div className="flex-[1] flex items-center">
                {item?.user?.mobile_no ?? ""}
              </div>
              <div className="flex-[1] flex items-center">
                {item?.user?.email?.length > 15
                  ? `${item.user.email.substring(0, 14)}...`
                  : item?.user?.email ?? t("N/A")}
              </div>
              <div className="flex-[0.7] flex items-center capitalize">
                {item?.status.toLowerCase() ?? ""}
              </div>
            </div>
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

export default DonorApplicationReportsTableRow;
