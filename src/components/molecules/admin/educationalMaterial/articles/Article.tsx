import { useEffect, useState } from "react";
import i18n from "../../../../../i18n";

const Article = ({ data }: { data: any }) => {
  const [locale, setLocale] = useState(i18n.language);
  const isArabic = locale === "ar";
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

  const sanitizeHTML = (html: any) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
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

  return (
    <>
      {data ? (
        <>
          <div
            className={`flex flex-col gap-1 w-[676px] ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            <div className="text-sm font-normal">
              {getDateValue(data?.createdAt)}
            </div>
            <div className="text-lg font-medium">{data?.title}</div>
            <div className="h-[279px] w-[676px]">
              <img
                src={
                  data.thumbnail ||
                  "https://firebasestorage.googleapis.com/v0/b/hortman-65ae0.appspot.com/o/files%2FarticleImage5.jpg?alt=media&token=6d73de24-c3f4-498d-a003-f1ff903b055a"
                }
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="text-base font-normal py-4">
              {sanitizeHTML(data.content)}
            </div>
            {/* <div className="text-base font-semibold">{data?.title}</div>
            <div className="text-base font-normal">
              {sanitizeHTML(data.content)}
            </div>
            <div>{sanitizeHTML(data.content)}</div> */}
          </div>
        </>
      ) : (
        <>
          <div className="my-10 h-20 w-[676px]">
            <p className="absolute text-center mx-auto italic right-0 left-0 w-full">
              There are no data to be displayed
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Article;
