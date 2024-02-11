// 로그인 관련 로직 대부분은 src/components/Login/LoginPage.js에서 가져왔습니다.

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import publicapi from "../api/publicapi";
import useFlutterWebview from "../hooks/useFlutterWebview";
import useApi from "../hooks/useApi";
import { useMutation } from "react-query";
import useToast from "../hooks/useToast";
import { ToastTheme } from "../components/Toast/Toast";
import useAuthorized from "../hooks/useAuthorized";
import useAuthToken from "../hooks/useAuthToken";

const useSendDeviceToken = () => {
  const { postFetcher } = useApi();
  return useMutation(
    async (data) => {
      return await postFetcher("/user/device/token", data);
    },
    {
      onError: (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        console.log(res);
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );
};

const AppleRedirecting = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  // TODO: 로그인 후 토큰 처리 로직 custom hook으로 추상화
  const { isMobile, getDeviceToken, storeAuthToken } = useFlutterWebview();
  const { mutate: sendDeviceToken } = useSendDeviceToken();
  const { showToast } = useToast({});
  const { setAutorized } = useAuthorized();
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken, getAccessToken, getRefreshToken } =
    useAuthToken();

  useEffect(() => {
    const login = async () => {
      const api = `/apple/login`;
      const data = code;

      try {
        const res = await publicapi.post(api, data);
        if (res.status === 200) {
          if (isMobile()) {
            const deviceToken = await getDeviceToken();

            sendDeviceToken(
              {
                device_token: deviceToken,
              },
              {
                onSuccess: (res) => alert(res.status),
                onError: (e) => alert(e.response.status),
              }
            );
          } else {
            showToast({
              message: "푸쉬 알림은 모바일에서만 받을 수 있습니다.",
              theme: ToastTheme.ERROR,
            });
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
