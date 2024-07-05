import axios from "axios";

// ErrorInterceptor
const onErrorResponse = async (error) => {
  if (axios.isAxiosError(error)) {
    const { config, response } = error;
    const errorMessage =
      response?.data?.message || "알 수 없는 오류가 발생했습니다.";
    const errorCode = response?.status;
    const { url, method, headers, data: requestData } = config;

    console.log(
      `ErrorInterceptor: ${url} - Status: ${errorCode}, Message: ${errorMessage}`
    );
    console.log("Request details:");
    console.log("Method:", method);
    console.log("Headers:", headers);
    console.log("Data:", requestData);
  } else {
    console.log(
      "ErrorInterceptor: 알 수 없는 오류가 발생했습니다. Error:",
      error
    );
  }
  return Promise.reject(error);
};

const setupInterceptors = (instance) => {
  instance.interceptors.response.use(function (response) {
    return response;
  }, onErrorResponse);

  return instance;
};

const baseURL =
  process.env.REACT_APP_API_ORIGIN + process.env.REACT_APP_API_DEFAULT_PREFIX;
const instance = axios.create();

instance.defaults.baseURL = baseURL;

// 토큰을 포함하지 않는 경우의 instance
const publicapi = setupInterceptors(instance);

export default publicapi;
