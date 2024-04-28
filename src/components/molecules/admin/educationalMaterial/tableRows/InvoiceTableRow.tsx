import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import i18n from "../../../../../i18n";
import DownloadButton from "../../../../atoms/admin/buttons/DownloadButton";
import ShareButton from "../../../../atoms/admin/buttons/ShareButton";
import { TableTitle } from "../../../../atoms/donor/typo";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const InvoiceTableRow = ({
  data,
  selectedInvoiceId,
  invoice
}: {
  data: any;
  selectedInvoiceId: string;
  invoice: any;
}) => {
  const [locale, setLocale] = useState(i18n.language);
  const isArabic = locale === "ar";
  const invoiceRef = useRef(null);
  useEffect(() => {
    const updateLocale = () => {
      setLocale(i18n.language);
    };

    // Add an event listener to update the locale when the language changes
    i18n.on("languageChanged", updateLocale);

    // Remove the event listener when the component is unmounted
    return () => {
      i18n.off("languageChanged", updateLocale);
    };
  }, []);

  console.log(selectedInvoiceId);

  const totalAmount = parseInt(data?.amount);

  // const totalAmount = parseInt(data?.package?.price);

  const handleShareClick = async () => {
    const input = invoiceRef.current;
    if (input) {
      try {
        const canvas = await html2canvas(input, {
          scale: 2,
          useCORS: true
        });
        const dataUrl = canvas.toDataURL();

        // Create a blob from the data URL
        const blob = await fetch(dataUrl).then((res) => res.blob());

        // Share on Facebook
        await navigator.share({
          title: "Share PDF on Facebook",
          files: [new File([blob], "invoice.pdf", { type: "application/pdf" })],
          url:
            "https://www.facebook.com/sharer/sharer.php?u=" +
            encodeURIComponent(window.location.href)
        });

        // Share on WhatsApp
        await navigator.share({
          title: "Share PDF on WhatsApp",
          files: [new File([blob], "invoice.pdf", { type: "application/pdf" })],
          text: "Check out this PDF",
          url:
            "whatsapp://send?text=" + encodeURIComponent(window.location.href)
        });

        console.log("Shared successfully");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDownloadClick = async () => {
    const input = invoiceRef.current;
    if (input) {
      try {
        const canvas = await html2canvas(input, {
          scale: 2,
          useCORS: true
        });
        const dataUrl = canvas.toDataURL();
        // eslint-disable-next-line new-cap
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: "a4"
        });
        const margin = 20;
        const width = pdf.internal.pageSize.getWidth() - 2 * margin;
        const height = (canvas.height * width) / canvas.width;

        pdf.addImage(dataUrl, "PNG", margin, margin, width, height);
        pdf.save("invoice.pdf");
      } catch (err) {
        console.log(err);
      }
    }
    console.log("error");
  };

  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput);

    const options: any = {
      year: "numeric",
      month: "short",
      day: "numeric"
      // hour: "numeric",
      // minute: "numeric"
      /* second: "numeric",
          timeZoneName: "short" */
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return inputDate.toLocaleDateString("en-US", options);
  };

  console.log(data, "payment by ID");
  console.log(totalAmount);

  return (
    <>
      {data ? (
        <div className={`w-full ${isArabic ? "text-right" : "text-left"}`}>
          <div ref={invoiceRef}>
            <div className="flex justify-between items-center p-5 ">
              <TableTitle
                text={`${invoice === undefined ? "Invoice #" : invoice}`}
                textSize="text-6xl"
                color="text-textSecondary"
              />
            </div>
            <div className=" pb-5">
              <div className="flex justify-between border-t p-5 border-[#EFE8D8]">
                <div className="flex flex-col gap-px">
                  <span className="text-inputText text-sm font-normal">
                    {t("status")}
                  </span>
                  {/* <span className="text-black-500 font-normal text-base">
              {selectedInvoice.status}
            </span> */}
                </div>
                <div className="flex flex-col gap-px">
                  <span className="text-inputText text-sm font-normal">
                    {t("payment-date")}
                  </span>
                  <span className="text-black-500 font-normal text-base">
                    {getDateValue(data?.created_at)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between pt-11 border-b p-5 pb-4 border-[#EFE8D8]">
                <div className="w-full justify-start">
                  <div className="flex flex-col gap-px">
                    <span className="text-inputText text-sm font-normal">
                      {t("payment-to")}
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
                      {t("payment-from")}
                    </span>
                    <span className="text-black-500 font-normal  text-base py-2">
                      {data?.user?.name}
                    </span>
                    <span className="text-inputText text-sm font-normal">
                      {data?.user?.email}
                    </span>

                    <span className="text-black-500 text-base font-normal">
                      {`Credit Card : **** ${data?.digits}`}
                    </span>
                    <span className="text-black-500 text-base font-normal">
                      {data?.bankDeatils ||
                        "Armani Beach Residences Palm Jumeirah,"}{" "}
                      <br />
                      {data?.userCountry || "Dubai - United Arab Emirates"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-5">
              <div
                className={`flex justify-between border-b px-5 pb-4 border-[#EFE8D8] ${
                  isArabic && "flex-row-reverse"
                }`}
              >
                <div className="flex flex-col gap-px">
                  <span className="text-inputText text-sm font-normal">
                    {t("items")}
                  </span>
                  <span className="text-black-500 font-medium text-base">
                    {data?.package?.name}
                  </span>
                  <span className="text-inputText text-sm font-normal">
                    {data?.package?.details}
                  </span>
                </div>
                <div className="flex flex-col gap-px justify-center">
                  <span className="text-black-500 font-normal text-base">
                    {data?.package?.price}
                  </span>
                </div>
              </div>
            </div>
            <div className="pb-5">
              <div className="flex justify-end border-b px-5 pb-28 border-[#EFE8D8]">
                <div className="w-1/3  ">
                  <div className="flex flex-col gap-px">
                    <div
                      className={`text-inputText text-sm font-normal flex justify-between ${
                        isArabic && "flex-row-reverse"
                      }`}
                    >
                      <span>{t("total")}</span>
                      <span>{data?.amount}</span>
                    </div>
                    <div
                      className={`text-inputText text-sm font-normal flex justify-between ${
                        isArabic && "flex-row-reverse"
                      }`}
                    >
                      <span>{t("delivery-fee")}</span>
                      <span>{data?.package?.deliveryFee || 0}</span>
                    </div>
                    <div
                      className={`text-inputText text-sm font-normal flex justify-between ${
                        isArabic && "flex-row-reverse"
                      }`}
                    >
                      <span>{t("taxes")}</span>
                      <span>{data?.package?.taxFee || 0}</span>
                    </div>
                    <div
                      className={` text-sm font-medium flex justify-between pt-4 ${
                        isArabic && "flex-row-reverse"
                      }`}
                    >
                      <span>{t("total")}</span>
                      <span>AED {totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between pb-5 px-4">
            <DownloadButton
              onClick={handleDownloadClick}
              title={`${t("download")}`}
            />
            <ShareButton onClick={handleShareClick} title={`${t("share")}`} />
          </div>
        </div>
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

export default InvoiceTableRow;
