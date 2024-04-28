import { getDataFromLocalStorage } from "../utils/common/accessLocalStorage";
import axiosInstance from "./axiosConfig";
import { getConfigurations } from "./config";

export const addSubmission = async (
  application: string = "657f3c74a4d2f2ce284975d4",
  questionSection: string,
  questionId: string,
  index: string,
  answers: any
) => {
  let apiSuccess = null;
  console.log(application);
  const applicationId = await getDataFromLocalStorage("donorApplicationId");
  let apiError = null;
  const configurations = await getConfigurations();
  await axiosInstance
    .post(
      `/submission`,
      {
        application: applicationId,
        questionSection,
        questionId,
        index,
        answers
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

export const editSubmission = async (
  applicationId: string = "657f3c74a4d2f2ce284975d4",
  questionId: string,
  answers: any,
  questionSection: string
) => {
  console.log(questionSection);

  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axiosInstance
    .patch(
      `/submission/${applicationId}/${questionId}`,
      {
        answers
        // questionSection
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

export const getSubmissionByApplicationIdAndQuestionId = async (
  applicationId: string,
  questionId: number,
  section: string
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axiosInstance
    .get(
      `/submission/application/${applicationId}/section/${section}/question/${questionId}`,
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

export const getSubmissionByApplicationIdAndSection = async (
  applicationId: string,
  section: string
) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axiosInstance
    .get(
      `/submission/application/${applicationId}/section/${section}`,
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
