/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-line no-unused-vars
/* eslint-disable @typescript-eslint/naming-convention */
import { Alert, Button } from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import EducationalMaterialHomeCard from "../../../atoms/donor/cards/educationalMaterialHomeCard";
import { useEffect, useState } from "react";
import { getEducationMaterials } from "../../../../api/education_material";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";

const EducationalMaterialColumn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/donor/educational-material");
  };

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [educationMaterialsData, setEducationMaterialsData] =
    useState<any>(null);

  useEffect(() => {
    void getEducationMaterialsData();
  }, []);

  const getEducationMaterialsData = async () => {
    setIsLoading(true);
    setIsError(false);
    const { apiSuccess, apiError }: any = await getEducationMaterials(
      searchTerm,
      true,
      1,
      20
    );
    setIsLoading(false);

    if (apiSuccess && apiSuccess.status === 200) {
      setEducationMaterialsData(apiSuccess.data.data.docs.slice(1, 4));
      // console.log(apiSuccess.data.data.docs.slice(0, 3));
      // setTotalPages(apiSuccess.data.data.totalPages);
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

  console.log(setSearchTerm);

  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput);

    const options: any = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };

    return inputDate.toLocaleDateString("en-US", options);
  };

  const sanitizeHTML = (html: any) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="w-full pt-6 px-9 min-h-[525px] flex flex-col justify-between">
      <div className="text-base font-medium ">{t("educational-materials")}</div>
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
            <div className="">
              {educationMaterialsData.map((item: any) => (
                <EducationalMaterialHomeCard
                  date={getDateValue(item.created_at)}
                  key={item._id}
                  description={
                    sanitizeHTML(`${item?.content}`).length > 70
                      ? sanitizeHTML(`${item?.content}`).substring(0, 70) +
                        "..."
                      : sanitizeHTML(`${item?.content}`)
                  }
                  id={item._id}
                  title={
                    `${item.title}`.length > 40
                      ? `${item.title}`.substring(0, 40) + "..."
                      : `${item.title}`
                  }
                  imgPath={item.thumbnail}
                  arabicTitle={item.arabicTitle}
                  arabicDescription={item.arabicHomeDescription}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="pb-6 pt-12 flex justify-center">
        <Button
          placeholder={""}
          onClick={handleClick}
          className="rounded-[50px] flex justify-center bg-gradient-to-r from-[#9A793D] to-[#DFC073] shadow-none text-base font-bold uppercase"
        >
          {t("view-all")}
        </Button>
      </div>
    </div>
  );
};

export default EducationalMaterialColumn;
