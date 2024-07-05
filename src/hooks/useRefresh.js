import { useNavigate } from "react-router-dom";
import publicapi from "../api/publicapi";
import useAuthToken from "./useAuthToken";
import useAuthorized from "./useAuthorized";

const useRefresh = () => {
  const { getRefreshToken, setRefreshToken, setAccessToken } = useAuthToken();
  const { setUnAuthorized } = useAuthorized();

  const navigate = useNavigate();

  // accessToken 재발급을 위한 axios 호출
  const refresh = async () => {
    try {
      const refreshToken = await getRefreshToken();
      const res = await publicapi.post("/auth/reissue", null, {
        headers: {
          Refresh: `${refreshToken}`,
        },
      });
      console.log(`access_token: ${res.data.data.accessToken}`);
      console.log(`refresh_token: ${res.data.data.refreshToken}`);
      setAccessToken(res.data.data.accessToken);
      setRefreshToken(res.data.data.refreshToken);
    } catch (e) {
      console.log("Error catch in /auth/reissue", e);
      // 401 : refresh token 만료
      if (e.response.status === 401) {
        await setRefreshToken("");
        setUnAuthorized();
        navigate("/");
      }
      throw e;
    }
  };

  return {
    refresh,
  };
};

export default useRefresh;
