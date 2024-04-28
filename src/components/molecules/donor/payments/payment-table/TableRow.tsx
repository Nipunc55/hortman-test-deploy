import { Link } from "react-router-dom";
import { type singlePaymentTableRowType } from "../../../../../types/singlePaymentTableRowType";
import {
  FailedStatusBadges,
  SuccessStatusBadges
} from "../../../../atoms/donor/badges/statusBadges";

import PaymentsDownload from "../../../../../assets/svg/paymentsDownload";

const PaymentTableRow = ({ data }: { data: singlePaymentTableRowType[] }) => {
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
  return (
    <div className="mb-20">
      {data?.map((item: any) => (
        <div key={item._id}>
          <Link to={`/donor/payments/invoice/${item?._id}`}>
            <div className="pt-3.5 px-5 flex flex-row font-normal items-center">
              <div className="flex-[2] flex justify-start items-center">
                {getDateValue(item?.created_at) ?? ""}
              </div>
              <div className="flex-[2.5] flex justify-start items-center gap-1">
                <span>{item?.package?.name ?? ""}</span>
              </div>
              <div className="flex-[3] flex items-center">
                {item?.user?.name ?? ""}
              </div>
              <div className="flex-[2] flex items-center">
                {item?.type === "card" && "Credit Card"}
              </div>
              <div className="flex-[2] flex items-center gap-2">
                <span>AED</span>
                <span className="text-base font-medium">
                  {item?.amount ?? ""}
                </span>
              </div>
              <div className="flex-[2.5] flex items-center">
                {item?.status === "COMPLETED" && (
                  <SuccessStatusBadges
                    status={`${item?.status === "COMPLETED" && "Completed"}`}
                  />
                )}
                {item?.status === "PENDING" && (
                  <SuccessStatusBadges
                    status={`${item?.status === "PENDING" && "Pending"}`}
                  />
                )}
                {item?.status === "REJECTED" && (
                  <FailedStatusBadges
                    status={`${item?.status === "REJECTED" && "Rejected"}`}
                  />
                )}
              </div>
              <div className="flex-[1] flex items-center">
                <PaymentsDownload />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PaymentTableRow;
