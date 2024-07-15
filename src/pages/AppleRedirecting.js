// 로그인 관련 로직 대부분은 src/components/Login/LoginPage.js에서 가져왔습니다.

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import publicapi from "../api/publicapi";
import useToast from "../hooks/useToast";
import { ToastTheme } from "../components/Toast/Toast";
import useAuthorized from "../hooks/useAuthorized";
import useAuthToken from "../hooks/useAuthToken";
import useSendDeviceToken from "../hooks/useSendDeviceToken";
import useMobileToken from "../hooks/useMobileToken";

const AppleRedirecting = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  // TODO: 로그인 후 토큰 처리 로직 custom hook으로 추상화
  const { getDeviceToken } = useMobileToken();
  const { mutate: sendDeviceToken } = useSendDeviceToken();
  const { showToast } = useToast({});
  const { setAutorized } = useAuthorized();
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken } = useAuthToken();

  useEffect(() => {
    const login = async () => {
      const api = `/apple/login`;
      const data = code;

      try {
        const res = await publicapi.post(api, data);
        if (res.status === 200) {
          try {
            const deviceToken = await getDeviceToken();
            sendDeviceToken({
              fcmToken: deviceToken,
            });
          } catch (e) {
            console.log(e);
          }

          navigate("/main");
          setAutorized();

          setAccessToken(res.data.data.accessToken);
          await setRefreshToken(res.data.data.refreshToken);
        }
      } catch (e) {
        console.log(e);
        if (e.response.status === 401) {
          showToast({
            message: "회원정보가 일치하지 않습니다.",
            theme: ToastTheme.ERROR,
          });

          navigate("/");
        }
      }
    };

    login();
  }, [code]);

  return null;
};

export default AppleRedirecting;
