import { t } from "i18next";
import { useEffect, useState } from "react";
import i18n from "../../../../../i18n";
import RelatedArticleCard from "../../../../atoms/donor/cards/relatedArticleCard";
import LoaderIconSvg from "../../../../../assets/svg/loaderIcon";

const RelatedArticle = ({
  data,
  selectedArticleId
}: {
  data: any;
  selectedArticleId: string;
}) => {
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

  const sanitizeHTML = (html: any) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  console.log(selectedArticleId + " related article id");

  return (
    <>
      {data ? (
        <>
          <div
            className={`flex flex-col gap-2 mt-5 w-full ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            <div className="text-2xl font-medium">
              {t("related-educational")}
            </div>
            <div className="flex flex-col gap-4  ">
              <div className="flex flex-col gap-2 min-h-0 ">
                {data.map((article: any) => (
                  <RelatedArticleCard
                    key={article?._id}
                    {...article}
                    path={article?.thumbnail}
                    date={getDateValue(article?.createdAt)}
                    title={article?.title}
                    content={`${sanitizeHTML(article?.content.substring(0, 200))}...`}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full my-10 h-20">
            <p className="absolute text-center mx-auto italic right-0 left-0 w-full">
              <LoaderIconSvg />
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default RelatedArticle;
