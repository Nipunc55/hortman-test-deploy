import { API_URL, getConfigurations } from "./config";
import axios from "axios";

export const getLocationById = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .get(`${API_URL}/location/${id}`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const getLocationByApplicationId = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .get(`${API_URL}/location/application/${id}`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const createLocation = async (
  application: string,
  type: string,
  mapLocation: string | null,
  apartmentNo: string,
  street: string,
  city: string,
  country: string,
  landmark: string
) => {
  let apiSuccess = null;
  let apiError = null;

  const payload: {
    application: string;
    type: string;
    mapLocation?: string | null;
    apartmentNo: string;
    street: string;
    city: string;
    country: string;
    landmark: string;
  } = {
    application,
    type,
    apartmentNo,
    street,
    city,
    country,
    landmark
  };

  if (mapLocation !== null) {
    payload.mapLocation = mapLocation;
  }
  const configurations = await getConfigurations();
  await axios
    .post(
      `${API_URL}/location`,
      {
        ...payload
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

export const updateLocation = async (
  id: string,
  type: string,
  mapLocation: string
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .patch(
      `${API_URL}/location/${id}`,
      {
        type,
        mapLocation
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

export const updateLocationByApplicationId = async (values: any) => {
  let apiSuccess = null;
  let apiError = null;
  console.log(values);
  const { type, apartmentNo, street, landmark, city, country, id } = values;
  const configurations = await getConfigurations();
  await axios
    .patch(
      `${API_URL}/location/application/${id}`,
      {
        type,
        apartmentNo,
        street,
        landmark,
        city,
        country
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
