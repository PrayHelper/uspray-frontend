import axios from "axios";

// ErrorInterceptor
const onErrorResponse = async (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response.data) {
      console.log(error.response.data.message);
    } else {
      console.log("알 수 없는 오류가 발생했습니다.");
    }
  } else {

  }
  return Promise.reject(error);
};

const setupInterceptors = (instance) => {
  instance.interceptors.response.use(function (response) {
    return response;
  },
   onErrorResponse);

  return instance;
};


const baseURL = process.env.REACT_APP_API_ORIGIN + process.env.REACT_APP_API_DEFAULT_PREFIX
const instance = axios.create();

instance.defaults.baseURL = baseURL

// 토큰을 포함하지 않는 경우의 instance
const publicapi = setupInterceptors(instance);

export default publicapi;