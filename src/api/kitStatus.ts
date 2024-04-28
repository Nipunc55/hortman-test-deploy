import { API_URL, getConfigurations } from "./config";
import axios from "axios";

export const getKitDispatchDetails = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;

  const configurations = await getConfigurations();
  await axios
    .get(`${API_URL}/delivery/application/${id}`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });
  return { apiSuccess, apiError };
};

export const createKitDispatch = async ({
  data
}: {
  data: {
    delivery_date_time: Date;
    driver: string;
    contact_person: string;
    contact_number: string;
    address: string;
    instructions: string;
    application: string;
  };
}) => {
  let apiSuccess = null;
  let apiError = null;

  const configurations = await getConfigurations();
  await axios
    .post(`${API_URL}/delivery`, data, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });
  return { apiSuccess, apiError };
};

export const getDrivers = async () => {
  let apiSuccess = null;
  let apiError = null;
  const limit = 10;
  const page = 1;

  const configurations = await getConfigurations();
  await axios
    .get(
      `${API_URL}/users?filter[role]=DRIVER&limit=${limit}&page=${page}`,
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

export const getKitPickups = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .get(`${API_URL}/pickup/application/${id}`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const createKitPickup = async ({
  data
}: {
  data: {
    pickup_date_time: Date;
    driver: string;
    contact_person: string;
    contact_number: string;
    address: string;
    instructions: string;
    application: string;
  };
}) => {
  let apiSuccess = null;
  let apiError = null;

  const configurations = await getConfigurations();
  await axios
    .post(`${API_URL}/pickup`, data, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const getApplicationStatusByAplicationId = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;

  const configurations = await getConfigurations();
  await axios
    .get(`${API_URL}/application-status/${id}`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};
