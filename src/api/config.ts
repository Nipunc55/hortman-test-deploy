import Cookies from "js-cookie";
import { getDataFromSessionStorage } from "../utils/common/accessLocalStorage";

export const isProd = false;

export const API_URL = isProd
  ? "https://hortman-389391c01752.herokuapp.com/api/v1"
  : "https://hortman-389391c01752.herokuapp.com/api/v1";

export const accessToken = getDataFromSessionStorage("access_token");

export const refreshToken = Cookies.get("refresh_token");

export const getConfigurations = async () => {
  const accessToken = await getDataFromSessionStorage("access_token");

  return {
    headers: { Authorization: `Bearer ${accessToken}` }
  };
};

export const getAccessToken = (): string => {
  return getDataFromSessionStorage("access_token");
};

export const configurations = {
  headers: { Authorization: `Bearer ${accessToken}` }
};
