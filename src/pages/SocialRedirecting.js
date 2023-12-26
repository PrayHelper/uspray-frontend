// 소셜 로그인(기존 가입자) 진행 도중 토큰을 저장하고 홈으로 redirect시키기 위한 페이지(without any UI)

import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAuthToken from "../hooks/useAuthToken";
import useAuthorized from "../hooks/useAuthorized";

const SocialRedirecting = () => {
  const [searchParams] = useSearchParams();

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  const { setAccessToken, setRefreshToken } = useAuthToken();
  const { setAutorized } = useAuthorized();

  const navigate = useNavigate();

  useEffect(() => {
    if (!!accessToken && !!refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setAutorized();
      navigate("/");
    }
  }, [
    setAccessToken,
    setRefreshToken,
    setAutorized,
    navigate,
    accessToken,
    refreshToken,
  ]);

  return <></>;
};

export default SocialRedirecting;
