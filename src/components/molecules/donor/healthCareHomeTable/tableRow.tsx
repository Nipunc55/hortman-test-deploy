import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import EducationalMaterialVideoCard from "../../../atoms/donor/cards/educationalMaterialVideoCard";
import { useEffect, useState } from "react";
import {
  getEducationMaterialsArticles,
  getEducationMaterialsVideos
} from "../../../../api/education_material";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import { Alert } from "@material-tailwind/react";

const TableRow = () => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate("/health-care/educational-material");
  };

  const handleArticlesClick = () => {
    navigate("/health-care/educational-material");
  };

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);

  const [educationMaterialsAriclesData, setEducationMaterialsAriclesData] =
    useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [educationMaterialsVideosData, setEducationMaterialsVideosData] =
    useState<any>(null);

  useEffect(() => {
    void getEducationMaterialsArtclesData();
  }, [currentPage, "Article"]);

  useEffect(() => {
    void getEducationMaterialsVideosData();
  }, [currentPage, " Video"]);

  const getEducationMaterialsArtclesData = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any = await getEducationMaterialsArticles(
      "Article",
      true,
      currentPage,
      20
    );
    setIsLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      setEducationMaterialsAriclesData(apiSuccess.data.data.docs.slice(0, 1));
      // console.log(apiSuccess.data.data);
      setTotalPages(apiSuccess.data.data.totalPages);
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

  console.log(totalPages, setCurrentPage);

  const getEducationMaterialsVideosData = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any = await getEducationMaterialsVideos(
      "Video",
      true,
      currentPage,
      20
    );
    setIsLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      setEducationMaterialsVideosData(apiSuccess.data.data.docs.slice(1, 2));
      console.log(apiSuccess.data.data + "videos");
      setTotalPages(apiSuccess.data.data.totalPages);
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

  // console.log(setSearchTerm);

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
    <div className="w-full border-t border-[#EFE8D8] mt-3">
      {isError && (
        <Alert
          color="red"
          className="w-full container absolute flex justify-center top-40"
        >
          <span>{message}</span>
        </Alert>
      )}
      <div>
        {isLoading ? (
          <div className="flex flex-col m-auto justify-center items-center my-10">
            <LoaderIconSvg />
          </div>
        ) : (
          <>
            <div className="flex justify-center items-center w-full gap-5 py-10">
              {Array.isArray(educationMaterialsAriclesData) &&
                educationMaterialsAriclesData.map((item: any) => (
                  <EducationalMaterialVideoCard
                    key={item?._id}
                    id={item?._id}
                    date={getDateValue(item.created_at)}
                    title={
                      `${item?.title}`.length > 40
                        ? `${item?.title}`.substring(0, 36) + "..."
                        : `${item?.title}`
                    }
                    video={item?.thumbnail}
                    // arabicTitle={item.arabicTitle}
                    buttonTitle={`${t("view-artciles")}`}
                    onclickFunction={handleVideoClick}
                  />
                ))}
              {Array.isArray(educationMaterialsVideosData) &&
                educationMaterialsVideosData.map((item: any) => (
                  <EducationalMaterialVideoCard
                    key={item?._id}
                    id={item?._id}
                    date={getDateValue(item?.created_at)}
                    title={item?.title}
                    video={item?.thumbnail}
                    buttonTitle={`${t("view-videos")}`}
                    onclickFunction={handleArticlesClick}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TableRow;
