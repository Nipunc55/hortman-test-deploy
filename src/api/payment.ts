import axiosInstance from "./axiosConfig";
import { configurations } from "./config";

export const checkoutStripe = async (payload: any) => {
  const response = axiosInstance.post(
    `/payments/checkout`,
    payload,
    configurations
  );

  return await response;
};

export const createPayment = async (
  // eslint-disable-next-line @typescript-eslint/naming-convention
  payment_intent_id: any,
  application: string,
  amount: number,
  description: string,
  packageId: string,
  location: string
) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .post(`/payments`, {
      payment_intent_id,
      application,
      amount,
      description,
      package: packageId,
      location
    })
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const getPayments = async (
  isAscending: boolean = true,
  page: number,
  limit: number = 10,
  donorName?: any,
  packageCategory?: any,
  toDate?: any,
  fromDate?: any
  // searchTerm?: any
) => {
  let apiSuccess = null;
  let apiError = null;
  const dateFilter =
    toDate instanceof Date && fromDate instanceof Date
      ? `and(gt(${fromDate.toISOString()}),lt(${toDate.toISOString()}))`
      : "";
  await axiosInstance
    .get(
      `/payments?${
        isAscending ? 1 : -1
      }&page=${page}&limit=${limit}&donor=${donorName || ""}&pkg=${packageCategory || ""}${dateFilter ? `&filter[created_at]=${dateFilter}` : ""}`,
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

export const getMyPayments = async () => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .get(`/payments/me/all`)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const getPaymentsById = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .get(`/payments/${id}`)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const getPaymentsByApplicationId = async (id: any) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .get(`/payments/application/${id}`)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const getPaymentsByUserId = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .get(`/payments/user/${id}`)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const updatePaymentById = async (
  id: string,
  application: string,
  amount: number,
  type: string,
  status: string
) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .post(`/payments/${id}`, {
      application,
      amount,
      type,
      status
    })
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const createInvoice = async (
  invoice: string,
  amount: number,
  description: string,
  application: string,
  packageItem: string,
  location: string
) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .post(`/payments`, {
      invoice,
      amount,
      description,
      application,
      package: packageItem,
      location
    })
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};
