import { t } from "i18next";
import RelatedArticleCard from "../tableHeaders/RelatedArticleCard";
import { useEffect, useState } from "react";
import i18n from "../../../../../i18n";
import { type singleEduMaterialType } from "../../../../../types/EducationalMaterials";

const RelatedArticle = ({
  data,
  selectedArticleId
}: {
  data: singleEduMaterialType[];
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
  const filteredData = data.filter(
    (item) => item.articleId !== selectedArticleId
  );

  if (filteredData.length === 0) {
    return <div>No data available for the selected articleId</div>;
  }

  return (
    <div
      className={`flex flex-col gap-2 mt-5 w-full ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      <div className="text-2xl font-medium">{t("related-educational")}</div>
      <div className="flex flex-col gap-4 h-[1500px] overflow-hidden ">
        <div className="flex flex-col gap-2 min-h-0 overflow-auto scroll-smooth related-articles-scrollbar pr-2">
          {filteredData.map((article) => (
            <RelatedArticleCard
              key={article.articleId}
              {...article}
              path={article.articleImage}
              date={article.articleDate}
              title={article.title}
              content={article.articleImageDescription}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedArticle;
