import { useQuery, useMutation } from "react-query";
import useApi from "./useApi";
import useMobileToken from "./useMobileToken";
import useSendDeviceToken from "./useSendDeviceToken";

export const useNotification = () => {
  const { getFetcher, postFetcher } = useApi();
  const { getDeviceToken } = useMobileToken();
  const { mutate: sendDeviceToken } = useSendDeviceToken();

  const { data, refetch: refetchIsNotifiedData } = useQuery(
    ["FetchNotifications"],
    async () => {
      return await getFetcher(`/member/notification-setting`);
    },
    {
      onError: async (e) => {
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

  const { mutate: setNotification } = useMutation(
    async (data) => {
      return await postFetcher("/member/notification-setting", data);
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: async (res, variables) => {
        console.log(res);
        refetchIsNotifiedData();

        if (variables.agree) {
          try {
            const deviceToken = await getDeviceToken();
            sendDeviceToken({
              fcmToken: deviceToken,
            });
          } catch (e) {
            console.log(e);
          }
        }
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const isNotifiedData = data?.data.data || {};

  return {
    isNotifiedData,
    refetchIsNotifiedData,
    setNotification,
  };
};
