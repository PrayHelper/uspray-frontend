import { useMutation } from "react-query";
import useApi from "./useApi";

const useSendDeviceToken = () => {
  const { putFetcher } = useApi();
  return useMutation(
    async (data) => {
      return await putFetcher("/member/fcm-token", data);
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
