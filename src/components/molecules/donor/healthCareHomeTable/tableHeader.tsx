import { t } from "i18next";
import { PrimaryTypo, TableHeaderSecondary } from "../../../atoms/donor/typo";
import { getUserById } from "../../../../api/user";
import { useEffect, useState } from "react";
import { getDataFromLocalStorage } from "../../../../utils/common/accessLocalStorage";
import { Alert } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";

const TableHeader = () => {
  const [userData, setUserData] = useState<{
    name: string;
    role: string;
  } | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);
  const loadPersonalData = async () => {
    const userId = await getDataFromLocalStorage("userId");
    const { apiError, apiSuccess }: any = await getUserById(userId);
    setIsLoading(false);
    if (apiSuccess && apiSuccess.status === 200) {
      // console.log(apiSuccess?.data?.data?.name);
      const name = apiSuccess?.data?.data?.name;
      const role = apiSuccess?.data?.data?.role;
      setUserData({ name, role });
      setIsLoading(false);
      // console.log(role);
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
    void loadPersonalData();
  }, []);
  return (
    <div className="flex flex-col gap-px items-start px-10 pt-5">
      {isError && (
        <Alert
          color="red"
          className="w-full container absolute flex justify-center top-40"
        >
          <span>{message}</span>
        </Alert>
      )}
      {isLoading ? (
        <div className="">
          <PrimaryTypo typo={`${t("welcome")}`} />
          <div className="flex flex-row items-center gap-2">
            <TableHeaderSecondary typo={t("loading")} />
            <LoaderIconSvg />
          </div>
        </div>
      ) : (
        <>
          <PrimaryTypo typo={`${t("welcome")}`} />
          <TableHeaderSecondary typo={userData?.name} />
        </>
      )}
    </div>
  );
};

export default TableHeader;
