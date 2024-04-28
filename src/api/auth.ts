import { API_URL } from "./config";
import axios from "axios";

export const login = async (mobileNo: any) => {
  let apiSuccess = null;
  let apiError = null;
  await axios
    .post(`${API_URL}/auth/login`, {
      mobile_no: mobileNo
    })
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const otpVerification = async (
  mobileNo: string,
  verificationCode: string
) => {
  let apiSuccess = null;
  let apiError = null;
  await axios
    .post(`${API_URL}/auth/verify`, {
      mobile_no: mobileNo,
      verification_code: verificationCode
    })
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};
