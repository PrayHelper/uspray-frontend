import axios from "axios";

// ErrorInterceptor
const onErrorResponse = async (error) => {
  if (axios.isAxiosError(error)) {
    const { status } = error.response;
    switch (status) {
      case 401: {
        console.log("refresh token is expired");
        break;
      }
      case 403: {
        console.log("access token is expired");
        break;
      }
      case 404: {
        console.log("잘못된 요청입니다.");
        break;
      }
      case 500: {
        console.log("서버에 문제가 발생했습니다.");
        break;
      }
      default: {
        // console.log(status);
        console.log("알 수 없는 오류가 발생했습니다.");
        break;
      }
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