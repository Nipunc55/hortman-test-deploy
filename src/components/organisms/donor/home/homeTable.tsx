import { useEffect, useState } from "react";
import EducationalMaterialColumn from "../../../molecules/donor/home/educationalMaterialColumn";
import HomeTableHeader from "../../../molecules/donor/home/table/homeTableHeader";
import HomeTableRow from "../../../molecules/donor/home/table/homeTableRow";
import { getDataFromLocalStorage } from "../../../../utils/common/accessLocalStorage";
import { getUserById } from "../../../../api/user";
import { getDonorApplicationByUserId } from "../../../../api/donor_application";
import { generateToken } from "../../../../firebase/config";
import { registerDevice } from "../../../../api/deviceTokens";
import { useNotificationToken } from "../../../../utils/common/customHooks";

const HomeTable = () => {
  const [userData, setUserData] = useState<{
    name: string;
    role: string;
  } | null>(null);
  const [hclId, setHCLId] = useState("");
  //custom hook for call notification device register
  useNotificationToken();

  const loadPersonalData = async () => {
    localStorage.removeItem("donor_step");
    const userId = await getDataFromLocalStorage("donorUserId");
    const { apiError, apiSuccess }: any = await getUserById(userId);
    if (apiSuccess && apiSuccess.status === 200) {
      // console.log(apiSuccess?.data?.data?.name);
      const name = apiSuccess?.data?.data?.name;
      const role = apiSuccess?.data?.data?.role;

      setUserData({ name, role });
      // console.log(role);
    } else if (apiError) {
      alert(apiError.response.data.message);
    }
  };
  // useEffect(() => {
  //   let isMounted = true; // Flag to track component mounting state

  //   async function getToken() {
  //     const notificationToken = localStorage.getItem("notification_token");
  //     if (!notificationToken) {
  //       const token = await generateToken();

  //       if (isMounted && token) {
  //         await registerDevice("token", token, "WEB");
  //         localStorage.setItem("notification_token", token);
  //       }
  //     }
  //   }

  //   void getToken();

  //   // Cleanup function to cancel any pending tasks when component unmounts
  //   return () => {
  //     isMounted = false; // Mark component as unmounted
  //   };
  // }, []);
  const loadData = async () => {
    const userId = await getDataFromLocalStorage("userId");
    const { apiError, apiSuccess }: any =
      await getDonorApplicationByUserId(userId);
    if (apiSuccess) {
      const stemCellData: any = apiSuccess?.data?.data[0]?.hscl_id;
      setHCLId(stemCellData);
      console.log(stemCellData);
    } else if (apiError) {
      console.log(apiError);
    }
  };

  useEffect(() => {
    void loadData();
    void loadPersonalData();
  }, []);
  return (
    <div className="bg-tableBg w-full rounded-xl shadow-lg my-5 mb-16 min-h-[525px]">
      <div className="flex w-full">
        <div className="flex flex-col border-r border-secondary  w-[60%]">
          <HomeTableHeader userName={userData?.name} hclId={hclId} />
          <HomeTableRow />
        </div>
        <div className="w-[40%] min-h-[525px]">
          <EducationalMaterialColumn />
        </div>
      </div>
    </div>
  );
};

export default HomeTable;
