import axios from "axios";
import useAuthToken from "../hooks/useAuthToken";
import useRefresh from "../hooks/useRefresh";

const useServerApi = () => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();

  const baseURL =
    process.env.REACT_APP_API_ORIGIN + process.env.REACT_APP_API_DEFAULT_PREFIX;
  const serverapi = axios.create({
    baseURL: `${baseURL}`,
  });

  const onErrorResponse = async (error) => {
    if (axios.isAxiosError(error)) {
      const { response, config } = error;
      const errorCode = response?.status;
      const errorMessage =
        response?.data?.message || "알 수 없는 오류가 발생했습니다.";
      const { url, data: requestData } = config;

      switch (errorCode) {
        case 401: {
          console.log("access token is expired");
          await refresh();
          break;
        }
        case 403: {
          console.log("refresh token is expired");
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
          console.log(`ErrorInterceptor: ${url}`);
          console.log(`-> Status: ${errorCode}`);
          console.log(`-> Message: ${errorMessage}`);
          console.log(
            `-> Request data: ${JSON.stringify(requestData, null, 2)}`
          );
          break;
        }
      }
    } else {
      console.log(
        "ErrorInterceptor: 알 수 없는 오류가 발생했습니다. Error:",
        error
      );
    }
    return Promise.reject(error);
  };

  //response:
  serverapi.interceptors.response.use(function (response) {
    return response;
  }, onErrorResponse);

  //request: header에 token 넣기
  serverapi.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );

  return {
    serverapi,
  };
};

export default useServerApi;
