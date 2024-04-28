import { useNavigate, useParams } from "react-router-dom";
import { t } from "i18next";
import { TableTitle } from "../../../atoms/donor/typo";
import BasicButton from "../../../atoms/admin/buttons/BasicButton";
import Article from "../../../molecules/donor/educationalMaterial/articles/article";
import { DummyEducationalMaterilaCardData } from "../../../../data/donor/dummyEducationalMaterilaData";
import RelatedArticle from "../../../molecules/donor/educationalMaterial/relatedArticle";

const EducationalMaterialArticles = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const selectedArticleId = articleId ?? "";

  return (
    <div className="bg-tableBg w-full py-5 rounded-xl shadow-lg my-5">
      <div className="flex justify-between items-center px-5">
        <TableTitle
          text={`${t("educational-materials")}`}
          textSize="text-6xl"
          color="text-textSecondary"
        />
        <BasicButton
          styledBorderEnabled={false}
          onClick={() => {
            navigate("/health-care/educational-material");
          }}
          text={t("back")}
        />
      </div>
      <div className="border-t-2 mt-4 border-secondary">
        <div className="flex w-full p-5 justify-between">
          <div className="">
            <Article
              data={DummyEducationalMaterilaCardData}
              // selectedArticleId={selectedArticleId}
            />
          </div>
          <div className="">
            <RelatedArticle
              data={DummyEducationalMaterilaCardData}
              selectedArticleId={selectedArticleId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalMaterialArticles;
