import { API_URL, getConfigurations } from "./config";
import axios from "axios";

export const getHealthCareProfessionals = async () => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .get(`${API_URL}/professionals`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const getHealthCareProfessionalById = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .get(`${API_URL}/professionals/${id}`, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const updateHealthCareProfessional = async (
  hospital: string,
  profession: string,
  dob: Date,
  nationality: string,
  passport: string,
  id: string,
  fullName: string,
  email: string
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .patch(
      `${API_URL}/professionals/${id}`,
      {
        hospital,
        profession,
        dob,
        nationality,
        passport,
        fullName,
        email
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
