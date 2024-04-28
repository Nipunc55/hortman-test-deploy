import { t } from "i18next";
import UpdateUserButton from "../../../../atoms/admin/buttons/UpdateUserButton";

const UserTableRows = ({ data }: { data: any }) => {
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
              <div
                key={item._id}
                className="py-4 flex flex-row font-normal text-base"
              >
                <div className="flex-[3]">
                  {getDateValue(item.created_at) ?? ""}
                </div>
                <div className="flex-[4] ">
                  {item?.name && item.name.length > 15
                    ? `${item?.name.substring(0, 15)}...`
                    : item?.name ?? t("N/A")}
                </div>
                <div className="flex-[2.5]">{item?.mobile_no ?? ""}</div>
                <div className="flex-[4.5]">
                  {item?.email && item.email.length > 25
                    ? `${item?.email.substring(0, 25)}...`
                    : item?.email ?? t("N/A")}
                </div>
                <div className="flex-[3] capitalize">
                  {item?.role.toLowerCase()}
                  {/* {item?.role === "DONOR" && "Donor"}
                  {item?.role === "ADMIN" && "Administrator"}
                  {item?.role === "Administrator" && "Administrator"}
                  {item?.role === "HEALTH" && "Health Profess"} */}
                </div>
                <div className="flex-[2]">
                  {item?.is_active ? (
                    <span className="text-black-500">Active</span>
                  ) : (
                    <span className="text-red-500">Inactive</span>
                  )}
                </div>
                <div className="flex-[1]">
                  <UpdateUserButton data={item} />
                </div>
              </div>
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

export default UserTableRows;
