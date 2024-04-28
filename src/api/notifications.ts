import axios from "axios";
import axiosInstance from "./axiosConfig";
import { API_URL, getConfigurations } from "./config";
export const submitNofications = async (
  title: string,
  body: string,
  notificationType: string,
  receiver: string,
  language: string = "en",
  _reviewedBy?: string,
  application?: string
) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .post(`/notifications/push`, {
      title,
      body,
      notification_type: notificationType,
      receiver,
      language,
      application
    })
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });
  return { apiSuccess, apiError };
};

export const submitEligibility = async (
  status: string,
  remark: string,
  reviewedBy: string,
  reviewer: string,
  application: string
) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .post(`/eligibility`, {
      status,
      remark,
      reviewed_by: reviewedBy,
      reviewer,
      application
    })
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });
  return { apiSuccess, apiError };
};

export const getNotifications = async (language: string) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .get(`/notifications?sort[created_at]=-1&filter[language]=${language}`)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });
  return { apiSuccess, apiError };
};

export const getElibilities = async (application: string) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .get(`/eligibility/${application}`)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });
  return { apiSuccess, apiError };
};

export const getNotificationsById = async (id: string, receiver: string) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .get(
      `/notifications?filter[application]=${id}&filter[receiver]=${receiver}&filter[notification_type]=ne(Eligibility Review)`
    )
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });
  return { apiSuccess, apiError };
};

export const getNotificationsRole = async (language: string) => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .get(
      `${API_URL}/notifications?filter[language]=${language}&filter[is_viewed]=false`,
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

export const updateNotificationIsViewed = async () => {
  let apiSuccess = null;
  let apiError = null;
  const configurations = await getConfigurations();
  await axios
    .patch(`${API_URL}/notifications`, {}, configurations)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const pushNofications = async (
  title: string,
  body: string,
  notificationType: string,
  receiver: string,
  language: string = "en",
  _reviewedBy?: string
) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .post(`/notifications/push`, {
      title,
      body,
      notification_type: notificationType,
      receiver,
      language
    })
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });
  return { apiSuccess, apiError };
};
