import axios from "axios";
import axiosInstance from "./axiosConfig";
import { API_URL, getConfigurations } from "./config";

export const addUser = async (
  name: string,
  email: string,
  mobileNumber: string,
  role: string,
  isActive: boolean
) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .post(`/users`, {
      name,
      email,
      mobile_no: mobileNumber,
      role,
      is_active: isActive
    })
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};
export const createDonor = async (
  name: string,
  email: string,
  mobileNumber: string
) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .post(
      `/auth/register
    `,
      {
        name,
        email,
        mobile_no: mobileNumber
        // role,
        // is_active: isActive
      }
    )
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });
  return { apiSuccess, apiError };
};
export const getUserById = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .get(`${API_URL}/users/${id}`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const getUsers = async (
  isAscending: boolean = false,
  page?: number,
  limit: number = 10,
  role?: string,
  name?: string,
  status?: boolean
) => {
  let apiSuccess = null;
  let apiError = null;
  const filters: string[] = [];
  if (role) filters.push(`filter[role]=${role}`);
  if (name) filters.push(`filter[user]=${name}`);
  if (status !== undefined) filters.push(`filter[is_active]=${status}`);

  const filtersString = filters.length > 0 ? `&${filters.join("&")}` : "";

  await axiosInstance
    .get(
      `/users?sort[created_at]=${
        isAscending ? 1 : -1
      }&page=${page}&limit=${limit}${filtersString}`
    )
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const updateUserByID = async (
  id: string,
  name: string,
  email: string,
  // mobileNumber: string,
  // role: string,
  isActive: boolean
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .patch(
      `${API_URL}/users/${id}`,
      {
        name,
        email,
        // mobile_no: "06655788321",
        // role,
        is_active: isActive
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
