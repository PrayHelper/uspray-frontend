import useServerApi from '../api/useServerApi';

const useApi = () => {
  const {serverapi} = useServerApi();

  // get 방식의 axios 호출
  const getFetcher = async (url, params) => {
    const response = await serverapi.get(url, {
      responseType: "json",
      headers: { "Content-Type": "application/json" },
      params: params,
    });
    return response;
  };

  // post 방식의 axios 호출
  const postFetcher = async (url, data) => {
    const response = await serverapi.post(
      url,
      { ...data },
      {
        responseType: "json",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  };

  // put 방식의 axios 호출
  const putFetcher = async (url, data) => {
    const response = await serverapi.put(
      url,
      { ...data },
      {
        responseType: "json",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  };

  // delete 방식의 axios 호출
  const deleteFetcher = async (url) => {
    const response = await serverapi.delete(url, {
      responseType: "json",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  };

  // delete 방식의 axios 호출
  const deleteDataFetcher = async (url, data) => {
    const response = await serverapi.delete(url, {
      responseType: "json",
      headers: { "Content-Type": "application/json" },
      data: data,
    });
    return response;
  };

  // accessToken 재발급을 위한 axios 호출
  const refresh = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const res = await serverapi.get("/user/token", {
        headers: {
          Authorization: `${refreshToken}`,
        },
      });
      return res.data.access_token;
    } catch (e) {
      // 401 : refresh token 만료
      if (e.status === 401) {
        localStorage.setItem("refreshToken", "");
        window.location.href("/");
      }
      return e;
    }
  };

  return {
    getFetcher,
    postFetcher,
    putFetcher,
    deleteFetcher,
    deleteDataFetcher,
    refresh,
  }
};

export default useApi;