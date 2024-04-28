// import { getDataFromLocalStorage } from "../utils/common/accessLocalStorage";
import axiosInstance from "./axiosConfig";
import { getConfigurations } from "./config";

export const registerDevice = async (
  token: string = "657f3c74a4d2f2ce284975d4",
  deviceUniqueId: string,
  deviceType: string = "WEB"
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axiosInstance
    .post(
      `/device-token`,
      {
        token,
        deviceUniqueId,
        deviceType
      },
      configurations
    )
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};
