import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import TableTitle from "../../../atoms/admin/typography/TableTitle";
import BasicButton from "../../../atoms/admin/buttons/BasicButton";
import SearchBar from "../../../atoms/admin/searchBar/SearchBar";
import EducationMaterialTableHeaders from "../../../molecules/admin/educationalMaterial/tableHeaders/EducationMaterialTableHeaders";
import EducationalMaterialTableRows from "../../../molecules/admin/educationalMaterial/tableRows/EducationalMaterialTableRows";
import { getEducationMaterials } from "../../../../api/education_material";
import { Alert } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";
import TablePagination from "../../../molecules/admin/pagination/TablePagination";

const EducationalMaterialTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [educationMaterialsData, setEducationMaterialsData] =
    useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    void getEducationMaterialsData();
  }, [currentPage, searchTerm]);

  const cancelSearch = () => {
    setSearchTerm("");
    console.log("clicked");
    setCurrentPage(1);
    void getEducationMaterialsData();
  };

  const getEducationMaterialsData = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any = await getEducationMaterials(
      searchTerm,
      true,
      currentPage,
      10
    );
    setIsLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      const filteredData = apiSuccess.data.data.docs.filter((material: any) =>
        material.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setEducationMaterialsData(filteredData);
      console.log(apiSuccess.data.data);
      setTotalPages(apiSuccess.data.data.totalPages);
      // setIsLoading(false);
    } else if (apiError) {
      setMessage(apiError.response.data.message);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-tableBg w-full p-5 rounded-xl shadow-lg my-5 mb-16">
      {isError && (
        <Alert
          color="red"
          className="w-full container absolute flex justify-center top-40"
        >
          <span>{message}</span>
        </Alert>
      )}
      <div className="flex justify-between items-center ">
        <TableTitle
          text={`${t("educational-materials")}`}
          textSize="text-6xl"
          color="text-textSecondary"
        />
        <BasicButton
          styledBorderEnabled={false}
          onClick={() => {
            navigate("/admin/add-educational-material");
          }}
          text={`${t("create")}`}
        />
      </div>
      <div className="py-4 w-full flex items-end justify-end border-t-2 mt-4 border-secondary">
        <SearchBar
          onChange={onInputChange}
          value={searchTerm}
          onclick={cancelSearch}
        />
      </div>
      <div className="">
        <EducationMaterialTableHeaders />
        <div className="min-h-[200px] flex flex-col justify-between">
          {isLoading ? (
            <div className="flex flex-col m-auto justify-center items-center my-10">
              <LoaderIconSvg />
            </div>
          ) : (
            <>
              <div>
                <EducationalMaterialTableRows data={educationMaterialsData} />
              </div>
            </>
          )}
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
    </div>
  );
};

export default EducationalMaterialTable;
