import { useMutation } from "react-query";
import useApi from "./useApi";
import useCheckMobile from "./useCheckMobile";
import useToast from "./useToast";
import { ToastTheme } from "../components/Toast/Toast";

const useSendDeviceToken = () => {
  const { putFetcher } = useApi();
  const { isMobile } = useCheckMobile();
  const { showToast } = useToast({});

  return useMutation(
    async (data) => {
      if (isMobile()) {
        if (data.fcmToken) {
          return await putFetcher("/member/fcm-token", data);
        } else {
          showToast({
            message: "디바이스 토큰을 받아오지 못했습니다.",
            theme: ToastTheme.ERROR,
          });
          throw new Error("디바이스 토큰을 받아오지 못했습니다.");
        }
      } else {
        showToast({
          message: "푸쉬 알림은 모바일에서만 받을 수 있습니다.",
          theme: ToastTheme.ERROR,
        });
        throw new Error("푸쉬 알림은 모바일에서만 받을 수 있습니다.");
      }
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

export default useSendDeviceToken;
