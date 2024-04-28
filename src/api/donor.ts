import { API_URL, getConfigurations } from "./config";
import axios from "axios";

export const getDonorsByFilter = async (
  country: string,
  passport: string,
  sort: number = 1,
  page: number = 1,
  limit: number = 3
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .get(
      `${API_URL}/donors?filter[country]=${country}&sort[created_at]=${sort}&page=${page}&limit=${limit}&filter[passport]=${passport}`,
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

export const getDonors = async () => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .get(`${API_URL}/donors`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const getDonorById = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .get(`${API_URL}/donors/${id}`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};
export const getMyDonors = async () => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .get(`${API_URL}/donors/me`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const updateDonorById = async (
  id: string,
  country: string,
  passport: string,
  name: string,
  email: string,
  mobileNo: string
) => {
  // let apiSuccess = null;
  // let apiError = null;
  const configurations = await getConfigurations();
  // await
  return await new Promise((resolve, reject) => {
    axios
      .patch(
        `${API_URL}/donors/${id}`,
        {
          country,
          name,
          email,
          mobile_no: mobileNo,
          passport
        },
        configurations
      )
      .then(function (response) {
        // apiSuccess = response;
        resolve(response);
        // apiSuccess = response;
      })
      .catch(function (error) {
        // apiError = error;
        reject(error);
      });
  });
  // return { apiSuccess, apiError };
};

export const createDonorApplication = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .post(
      `${API_URL}/application`,
      {
        user: id
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

export const updateApplicationByUser = async (
  data: any,
  applicationId: string
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  // .patch(`${API_URL}/application/user/${applicationId}`, data, configurations) I have changed this to .patch(`${API_URL}/application/${applicationId}`, data, configurations)
  await axios
    .patch(`${API_URL}/application/${applicationId}`, data, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });
  return { apiError, apiSuccess };
};

export const updateApplicationStatusByUser = async (
  data: any,
  applicationId: any
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  // .patch(`${API_URL}/application/user/${applicationId}`, data, configurations) I have changed this to .patch(`${API_URL}/application/${applicationId}`, data, configurations)
  await axios
    .patch(
      `${API_URL}/application-status/${applicationId}`,
      data,
      configurations
    )
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });
  return { apiError, apiSuccess };
};
