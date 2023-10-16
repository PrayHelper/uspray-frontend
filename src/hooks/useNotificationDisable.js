import { useMutation } from "react-query";
import useApi from './useApi';

export const useNotificationDisable = (data) => {
  const { putFetcher } = useApi();
  return useMutation(
    async (data) => {
      return await putFetcher("/user/notification/" + data.id + "/disable", data.id);
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
