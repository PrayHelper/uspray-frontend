// 1️⃣ 프론트에서 인가 코드 받고 백엔드 호출
// 2️⃣ 가입 상태면 로그인 시키고 미가입 상태면 이름 받아서 회원가입  (without any UI)

import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useMobileToken from "../hooks/useMobileToken";
import useSendDeviceToken from "../hooks/useSendDeviceToken";
import useAuthorized from "../hooks/useAuthorized";
import useAuthToken from "../hooks/useAuthToken";
import publicapi from "../api/publicapi";
import useToast from "../hooks/useToast";
import { ToastTheme } from "../components/Toast/Toast";

const SocialKakaoRedirecting = () => {
  const [searchParams] = useSearchParams();
  const authorizationCode = searchParams.get("code");

  const { getDeviceToken } = useMobileToken();
  const { mutate: sendDeviceToken } = useSendDeviceToken();

  const { setAutorized } = useAuthorized();
  const { setAccessToken, setRefreshToken, getAccessToken, getRefreshToken } =
    useAuthToken();

  const navigate = useNavigate();

  const { showToast } = useToast({});

  const kakaoLogin = async () => {
    const api = `바꾸기`;
    const data = authorizationCode;

    try {
      const res = await publicapi.post(api, data);
      if (res.status === 200) {
        try {
          const deviceToken = await getDeviceToken();
          sendDeviceToken({ fcmToken: deviceToken });
        } catch (e) {
          console.log(e);
        }

        setAutorized();
        setAccessToken(res.data.data.accessToken);
        await setRefreshToken(res.data.data.refreshToken);
        console.log("access: ", getAccessToken());
        console.log("refresh: ", await getRefreshToken());

        navigate("/main");
      } else if (res.status === 201) {
        navigate(`/socialLoginNameInput?code=${authorizationCode}`);
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 400) {
        showToast({
          message: e.response.data.message,
          theme: ToastTheme.ERROR,
        });
      }
    }
  };

  useEffect(() => {
    kakaoLogin();
  }, []);

  return <></>;
};

export default SocialKakaoRedirecting;
