import { API_URL, getConfigurations } from "./config";
import axios from "axios";

export const createPersonalDetails = async (
  application: string,
  personType: string,
  email: string,
  fullName: string,
  dob: Date,
  nationality: string,
  passport: string,
  alternatePhoneNum: string,
  ethnicity: string,
  passportFirstPage: string,
  emiratesIdFront: string,
  emiratesIdBack: string
) => {
  let apiSuccess = null;
  let apiError = null;

  let payload: {
    application: string;
    personType: string;
    email: string;
    fullName: string;
    dob: Date;
    nationality: string;
    passport: string;
    alternatePhoneNum?: string;
    ethnicity: string;
    passportFirstPage: string;
    emiratesIdFront: string;
    emiratesIdBack: string;
  } = {
    application,
    personType,
    email,
    fullName,
    dob,
    nationality,
    passport,
    ethnicity,
    passportFirstPage,
    emiratesIdFront,
    emiratesIdBack
  };

  if (alternatePhoneNum !== "") {
    payload = {
      ...payload,
      alternatePhoneNum
    };
  }
  const configurations = await getConfigurations();
  await axios
    .post(
      `${API_URL}/personalDetails`,
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

export const getPersonalDetailById = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .get(`${API_URL}/personalDetails/${id}`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const getPersonalDetailByApplicationId = async (
  id: any,
  type: string
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .get(
      `${API_URL}/personalDetails/application/${id}/personType/${type}`,
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
  application: string,
  personType: string,
  email: string,
  fullName: string,
  dob: string,
  nationality: string,
  passport: string
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .patch(
      `${API_URL}/personalDetails/${id}`,
      {
        application,
        personType,
        email,
        fullName,
        dob,
        nationality,
        passport
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

export const updateLocationByApplicationId = async (
  id: string,
  application: string,
  personType: string,
  email: string,
  fullName: string,
  dob: string,
  nationality: string,
  passport: string
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .post(
      `${API_URL}/personalDetails/application/${id}`,
      {
        application,
        personType,
        email,
        fullName,
        dob,
        nationality,
        passport
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
export const updatePersonalDetails = async (
  application: string,
  personType: string,
  email: string,
  fullName: string,
  dob: Date,
  nationality: string,
  passport: string,
  alternatePhoneNum: string,
  ethnicity: string,
  passportFirstPage: string,
  emiratesIdFront: string,
  emiratesIdBack: string
) => {
  let apiSuccess = null;
  let apiError = null;

  let payload: {
    // application: string;
    personType: string;
    email: string;
    fullName: string;
    dob: Date;
    nationality: string;
    passport: string;
    alternatePhoneNum?: string;
    ethnicity: string;
    passportFirstPage: string;
    emiratesIdFront: string;
    emiratesIdBack: string;
  } = {
    // application,
    personType,
    email,
    fullName,
    dob,
    nationality,
    passport,
    ethnicity,
    passportFirstPage,
    emiratesIdFront,
    emiratesIdBack
  };

  if (alternatePhoneNum !== "") {
    payload = {
      ...payload,
      alternatePhoneNum
    };
  }
  const configurations = await getConfigurations();
  await axios
    .patch(
      `${API_URL}/personalDetails/application/${application}`,
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
