import { t } from "i18next";
import { type singlePaymentType } from "../../../../../types/Payments";
import DownloadButton from "../../../../atoms/admin/buttons/DownloadButton";
import ShareButton from "../../../../atoms/admin/buttons/ShareButton";

const InvoiceTableRow = ({
  data,
  selectedInvoiceId
}: {
  data: singlePaymentType[];
  selectedInvoiceId: string;
}) => {
  const selectedData = data.filter(
    (item) => item.invoiceId === selectedInvoiceId
  );

  if (selectedData.length === 0) {
    return <div>No data available for the selected invoiceId</div>;
  }

  const selectedInvoice = selectedData[0];

  const totalAmount =
    selectedInvoice.amount +
    selectedInvoice.deliveryFee +
    selectedInvoice.taxFee;

  const handleDownloadClick = () => {
    console.log("Download button clicked");
  };

  const handleShareClick = () => {
    console.log("Share button clicked");
  };

  return (
    <div className="w-full  ">
      <div className=" pb-5">
        <div className="flex justify-between border-t p-5 border-[#EFE8D8]">
          <div className="flex flex-col gap-px">
            <span className="text-inputText text-sm font-normal">Status</span>
            <span className="text-black-500 font-normal text-base">
              {selectedInvoice.status}
            </span>
          </div>
          <div className="flex flex-col gap-px">
            <span className="text-inputText text-sm font-normal">
              Payment Date
            </span>
            <span className="text-black-500 font-normal text-base">
              {selectedInvoice.date}
            </span>
          </div>
        </div>
        <div className="flex justify-between pt-11 border-b p-5 pb-4 border-[#EFE8D8]">
          <div className="w-full justify-start">
            <div className="flex flex-col gap-px">
              <span className="text-inputText text-sm font-normal">
                Payment To
              </span>
              <span className="text-black-500 font-medium  text-base py-2">
                Hortman Stem Cell Laboratory
              </span>
              <span className="text-inputText text-sm font-normal">
                name@email.com
              </span>
              <span className="text-black-500 text-base font-normal">
                EmiratesNBD Bank #0123456789
              </span>
              <span className="text-black-500 text-base font-normal">
                32 Floor Burj Al Salam building - Sheikh Zayed Rd,
                <br /> Dubai - United Arab Emirates
              </span>
            </div>
          </div>
          <div className="w-full justify-start">
            <div className="flex flex-col gap-px">
              <span className="text-inputText text-sm font-normal">
                Payment From
              </span>
              <span className="text-black-500 font-normal  text-base py-2">
                {selectedInvoice.donorName}
              </span>
              <span className="text-inputText text-sm font-normal">
                {selectedInvoice.userEmail}
              </span>

              <span className="text-black-500 text-base font-normal">
                {`Credit Card : **** ${selectedInvoice.creditCardLastDigits}`}
              </span>
              <span className="text-black-500 text-base font-normal">
                {selectedInvoice.donorsBankDetails} <br />
                {selectedInvoice.country}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-5">
        <div className="flex justify-between border-b px-5 pb-4 border-[#EFE8D8]">
          <div className="flex flex-col gap-px">
            <span className="text-inputText text-sm font-normal">Items</span>
            <span className="text-black-500 font-medium text-base">
              {selectedInvoice.package}
            </span>
            <span className="text-inputText text-sm font-normal">
              {selectedInvoice.description}
            </span>
          </div>
          <div className="flex flex-col gap-px justify-center">
            <span className="text-black-500 font-normal text-base">
              {selectedInvoice.amount}
            </span>
          </div>
        </div>
      </div>
      <div className="pb-5">
        <div className="flex justify-end border-b px-5 pb-28 border-[#EFE8D8] ">
          <div className="w-1/3">
            <div className="flex flex-col gap-px">
              <div className="text-inputText text-sm font-normal flex justify-between">
                <span>Subtotal</span>
                <span>{selectedInvoice.amount}</span>
              </div>
              <div className="text-inputText text-sm font-normal flex justify-between">
                <span>Delivery Fee</span>
                <span>{selectedInvoice.deliveryFee}</span>
              </div>
              <div className="text-inputText text-sm font-normal flex justify-between">
                <span>Taxes & Other Fees</span>
                <span>{selectedInvoice.taxFee}</span>
              </div>
              <div className=" text-sm font-medium flex justify-between pt-4">
                <span>Total</span>
                <span>
                  {t("$")}
                  {totalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between pb-5 px-4">
        <DownloadButton onClick={handleDownloadClick} title="Downlaod" />
        <ShareButton onClick={handleShareClick} title="Share" />
      </div>
    </div>
  );
};

export default InvoiceTableRow;
