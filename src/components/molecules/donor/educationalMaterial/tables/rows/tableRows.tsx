import {
  Alert,
  Button,
  ButtonGroup,
  Tabs,
  TabsBody
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import VideoSection from "../../videos";
import ArticleSectionHome from "../../articles/articleHome";
import { t } from "i18next";
import {
  getEducationMaterialsArticles,
  getEducationMaterialsVideos
} from "../../../../../../api/education_material";
import LoaderIconSvg from "../../../../../../assets/svg/loaderIcon";
import TablePagination from "../../../../admin/pagination/TablePagination";

const TableRows = () => {
  const ARTICLES = "ARTICLES";
  const VIDEOS = "VIDEOS";
  const [selectedTab, setselectedTab] = useState<string>(ARTICLES);
  const [searchTerm, setSearchTerm] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [educationMaterialsAriclesData, setEducationMaterialsAriclesData] =
    useState<any>(null);
  const [educationMaterialsVideosData, setEducationMaterialsVideosData] =
    useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    void getEducationMaterialsArtclesData();
    void getEducationMaterialsVideosData();
  }, [currentPage, searchTerm]);

  console.log(setSearchTerm);

  const getEducationMaterialsArtclesData = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any = await getEducationMaterialsArticles(
      searchTerm,
      true,
      currentPage,
      20
    );
    setIsLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      setEducationMaterialsAriclesData(apiSuccess.data.data.docs);
      console.log(apiSuccess.data.data.docs);
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

  const getEducationMaterialsVideosData = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any = await getEducationMaterialsVideos(
      searchTerm,
      true,
      currentPage,
      20
    );
    setIsLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      setEducationMaterialsVideosData(apiSuccess.data.data.docs);
      console.log(apiSuccess.data.data.docs);
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

  return (
    <div className="w-full border-t border-secondary mt-5 overflow-auto ">
      <div className="flex justify-center items-center my-7 ">
        <ButtonGroup
          variant="outlined"
          size="sm"
          className="gold-gradient-button-group border border-transparent rounded-lg h-10"
          placeholder={""}
        >
          <Button
            onClick={() => setselectedTab(ARTICLES)}
            className={`flex items-center w-full px-5 gap-3 ${
              selectedTab === ARTICLES
                ? "gold-gradient-button-group-active"
                : "gold-gradient-button-group"
            } normal-case shadow-none border-transparent text-black-500 text-xs font-medium`}
            placeholder={""}
          >
            {t("articles")}
          </Button>
          <Button
            onClick={() => setselectedTab(VIDEOS)}
            className={`flex items-center w-full px-5 gap-3 ${
              selectedTab === VIDEOS
                ? "gold-gradient-button-group-active"
                : "gold-gradient-button-group"
            } normal-case shadow-none border-transparent text-black-500 text-xs font-medium`}
            placeholder={""}
          >
            {t("videos")}
          </Button>
        </ButtonGroup>
      </div>
      <div className="">
        {isError && (
          <Alert
            color="red"
            className="w-full container absolute flex justify-center top-40"
          >
            <span>{message}</span>
          </Alert>
        )}
        <Tabs value="html">
          <TabsBody placeholder={""}>
            {isLoading ? (
              <div className="flex flex-col m-auto justify-center items-center my-10">
                <LoaderIconSvg />
              </div>
            ) : (
              <>
                {selectedTab === ARTICLES ? (
                  <ArticleSectionHome data={educationMaterialsAriclesData} />
                ) : selectedTab === VIDEOS ? (
                  <VideoSection data={educationMaterialsVideosData} />
                ) : null}
              </>
            )}
          </TabsBody>
        </Tabs>
        <div>
          {totalPages > 1 && (
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TableRows;
