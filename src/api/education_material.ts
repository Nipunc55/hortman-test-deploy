import axiosInstance from "./axiosConfig";

export const createEducationMaterial = async (
  title: string,
  postType: string,
  content: string,
  url: string,
  thumbnail: string
) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .post(`/eduMaterials`, {
      title,
      postType,
      content,
      url,
      thumbnail
    })
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const getEducationMaterials = async (
  keyword: string,
  isAscending: boolean = true,
  page: number,
  limit: number = 10
) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .get(
      `/eduMaterials?keyword=${keyword}&sort[created_at]=${
        isAscending ? -1 : 1
      }&page=${page}&limit=${limit}`
    )
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const getEducationMaterialsArticles = async (
  keyword: string,
  isAscending: boolean = true,
  page: number,
  limit: number = 10
) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .get(
      `/eduMaterials?filter[postType]=Article&keyword=${keyword}&sort[created_at]=${
        isAscending ? 1 : -1
      }&page=${page}&limit=${limit}`
    )
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const getEducationMaterialsVideos = async (
  keyword: string,
  isAscending: boolean = true,
  page: number,
  limit: number = 10
) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .get(
      `/eduMaterials?filter[postType]=Video&keyword=${keyword}&sort[created_at]=${
        isAscending ? 1 : -1
      }&page=${page}&limit=${limit}`
    )
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const getEducationMaterialById = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .get(`/eduMaterials/${id}`)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const updateEducationMaterial = async (
  title: string,
  postType: string,
  content: string
) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .patch(`/eduMaterials`, {
      title,
      postType,
      content
    })
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};

export const deleteEducationMaterialById = async (id: string) => {
  let apiSuccess = null;
  let apiError = null;
  await axiosInstance
    .delete(`/eduMaterials/${id}`)
    .then(function (response) {
      apiSuccess = response;
    })
    .catch(function (error) {
      apiError = error;
    });

  return { apiSuccess, apiError };
};
