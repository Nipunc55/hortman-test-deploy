import { API_URL, getConfigurations } from "./config";
import axios from "axios";

export const createPackage = async (
  name: string,
  packageDetails: string,
  price: number,
  subHeading: string,
  image: string
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .post(
      `${API_URL}/packages`,
      {
        name,
        package_details: packageDetails,
        price,
        sub_heading: subHeading,
        image
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

export const getPackages = async () => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .get(`${API_URL}/packages`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const getPackageById = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .get(`${API_URL}/packages/${id}`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const updatePackage = async (
  name: string,
  packageDetails: string,
  price: number,
  subHeading: string,
  image: string
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .patch(
      `${API_URL}/packages`,
      {
        name,
        package_details: packageDetails,
        price,
        sub_heading: subHeading,
        image
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
