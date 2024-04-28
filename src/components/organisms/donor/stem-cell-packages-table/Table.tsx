import { useEffect, useState } from "react";
import StemCellTableRow from "../../../molecules/donor/stem-cell-packages-table/StemCellTableRow";
import StemCellTableHeader from "../../../molecules/donor/stem-cell-packages-table/stemCellTableHeader";
import { getDonorApplicationByUserId } from "../../../../api/donor_application";
import { getDataFromLocalStorage } from "../../../../utils/common/accessLocalStorage";
import { type singleStemCellPackageType } from "../../../../types/stemCellPackageType";
import { Alert } from "@material-tailwind/react";
import LoaderIconSvg from "../../../../assets/svg/loaderIcon";

const Table = () => {
  const [stemCellData, setStemCellData] = useState<singleStemCellPackageType[]>(
    []
  );
  const loadData = async () => {
    setIsLoading(true);
    setIsError(false);
    const userId = await getDataFromLocalStorage("userId");
    const { apiError, apiSuccess }: any =
      await getDonorApplicationByUserId(userId);
    if (apiSuccess) {
      const stemCellData: any[] = apiSuccess?.data?.data;
      console.log(stemCellData);
      setStemCellData(stemCellData);
      // console.log(apiSuccess?.data?.data);
      setIsLoading(false);
    } else if (apiError) {
      console.log(apiError);

      // alert(apiError?.response?.data?.message);
      setIsError(true);
      setIsLoading(false);
      setMessage(apiError.response.data.message);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };
  useEffect(() => {
    void loadData();
  }, []);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);

  return (
    <div className="my-5">
      <div className="bg-white w-full rounded-xl shadow-lg">
        {isError && (
          <Alert
            color="red"
            className="w-full container flex justify-center mt-10"
          >
            <span>{message}</span>
          </Alert>
        )}
        <StemCellTableHeader />
        <div className="flex flex-col min-h-[250px] max-h-[250px] overflow-auto">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <LoaderIconSvg />
            </div>
          ) : (
            <>
              {stemCellData?.map((item, index) => (
                <StemCellTableRow data={item} key={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
