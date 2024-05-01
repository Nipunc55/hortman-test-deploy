import { Link } from "react-router-dom";
import ActionButton from "../../../../atoms/admin/buttons/ActionButton";
import DropDownArrow from "../../../../../assets/svg/dropDownArrow";
import { t } from "i18next";

const PaymentTableRow = ({ data }: { data: any }) => {
  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput);
    console.log(dateInput);
    const options: any = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };

    return inputDate.toLocaleDateString("en-US", options);
  };

  console.log(data);

  return (
    <div className="mb-20">
      {data?.length > 0 ? (
        <>
          {data?.map((item: any) => (
            <>
              <div
                key={item._id}
                className="pt-3.5 px-5 flex flex-row font-normal items-center"
              >
                <div className="flex-[2] flex items-center">
                  {getDateValue(item?.created_at) ?? ""}
                </div>
                <div className="flex-[2.5] flex justify-start items-center gap-1">
                  <span>{item?.package?.name ?? ""}</span>
                </div>
                <div className="flex-[3] flex items-center">
                  {item?.user?.name ?? ""}
                </div>
                <div className="flex-[2] flex items-center">
                  {item?.type ?? ""}
                </div>
                <div className="flex-[2] flex items-center gap-2">
                  {/* <span></span> */}
                  <span className="text-base font-medium">
                    {t("$")}
                    {item?.amount ?? ""}
                  </span>
                </div>
                <div className="flex-[2.5] flex items-center">
                  {(item?.status === "COMPLETED" && "Completed") ||
                    (item?.status === "PAID" && "Completed")}
                  {item?.status === "PENDING" && "Pending"}
                  {item?.status === "REJECTED" && "Rejected"}
                </div>
                <div className="flex-[1.5] flex items-center">
                  <Link to={`/admin/payments/invoice/${item?._id}`}>
                    <button className="outline-none">
                      <ActionButton
                        endIcon={<DropDownArrow />}
                        text={"Action"}
                        onclick={() => {}}
                      />
                    </button>
                  </Link>
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
    </div>
  );
};

export default PaymentTableRow;
