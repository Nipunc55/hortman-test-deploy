import axiosInstance from "./axiosConfig";
import { getConfigurations } from "./config";

export const createDonorApplication = async (user: string) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axiosInstance
    .post(
      `/application`,
      {
        user
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

export const getDonorApplicationById = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axiosInstance
    .get(`/application/${id}`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};
export const getDonorApplicationHistoryById = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axiosInstance
    .get(`/submission/history/${id}`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};
export const getDonorApplications = async (
  isAscending: boolean = true,
  page: number,
  limit: number = 10,
  donorName?: any,
  packageCategory?: any,
  toDate?: any,
  fromDate?: any,
  searchTerm?: string
) => {
  let apiSuccess = null;
  let apiError = null;
  console.log(toDate, fromDate, searchTerm, isAscending);
  // alert(isAscending);

  const configurations = await getConfigurations();
  const dateFilter =
    toDate instanceof Date && fromDate instanceof Date
      ? `and(gt(${fromDate.toISOString()}),lt(${toDate.toISOString()}))`
      : "";
  await axiosInstance
    .get(
      `/application?page=${page}&limit=${limit}&donor=${donorName || ""}&pkg=${packageCategory || ""}${dateFilter ? `&filter[created_at]=${dateFilter}&sort[created_at]=-1` : "&sort[created_at]=-1"}`,
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

export const getDonorApplicationByUserId = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axiosInstance
    .get(`/application/user/${id}`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const updateDonorApplicationByUserId = async (
  id: string,
  banking: string,
  packageName: string
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axiosInstance
    .patch(
      `/application/byuser/${id}`,
      {
        banking,
        package: packageName
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

export const updateDonorApplicationStatusById = async (
  id: string,
  status: string
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axiosInstance
    .patch(
      `/application/status/${id}`,
      {
        status
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
