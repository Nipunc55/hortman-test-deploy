import { useNavigate, useParams } from "react-router-dom";
import { t } from "i18next";
import TableTitle from "../../../atoms/admin/typography/TableTitle";
import BasicButton from "../../../atoms/admin/buttons/BasicButton";
import Article from "../../../molecules/admin/educationalMaterial/articles/Article";
import { useEffect, useState } from "react";
import {
  getEducationMaterialById,
  getEducationMaterials
} from "../../../../api/education_material";
import { Alert } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import RelatedArticle from "../../../molecules/donor/educationalMaterial/relatedArticle";

const EducationalMaterialArticles = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const selectedArticleId = articleId ?? "";
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [educationMaterialsArticleData, setEducationMaterialsArticleData] =
    useState<any>(null);
  const [educationRelatedArticlesData, setEducationRelatedArticlesData] =
    useState<any>(null);

  useEffect(() => {
    void getEducationMaterialsDataByID();
  }, [selectedArticleId]);

  const getEducationMaterialsDataByID = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any =
      await getEducationMaterialById(selectedArticleId);
    setIsLoading(false);
    if (apiSuccess && apiSuccess.status === 200) {
      setEducationMaterialsArticleData(apiSuccess.data.data);
      console.log(apiSuccess.data);
      setIsLoading(false);
    } else if (apiError) {
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const getRelatedArticlesData = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any = await getEducationMaterials(
      "",
      false,
      0,
      30
    );
    setIsLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      setEducationRelatedArticlesData(apiSuccess.data.data.docs);
      console.log(apiSuccess.data.data.docs);
      setIsLoading(false);
    } else if (apiError) {
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    void getRelatedArticlesData();
  }, [1, ""]);

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
            navigate("/admin/educational-material");
          }}
          text={`${t("back")}`}
        />
      </div>
      {isError && (
        <Alert
          color="red"
          className="w-full container absolute flex justify-center top-40"
        >
          <span>{message}</span>
        </Alert>
      )}
      <div className="border-t-2 mt-4 border-secondary">
        {isLoading ? (
          <div className="flex justify-center items-center my-10">
            <LoaderIconSvg />
          </div>
        ) : (
          <>
            <div className="flex w-full p-5 justify-between">
              <div className="min-h-[600px] ">
                <Article data={educationMaterialsArticleData} />
              </div>
              <div className="min-h-[600px] max-h-[600px] overflow-auto scroll-smooth related-articles-scrollbar pr-2">
                <RelatedArticle
                  data={educationRelatedArticlesData}
                  selectedArticleId={selectedArticleId}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EducationalMaterialArticles;
