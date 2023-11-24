import { useMutation } from "react-query";
import useApi from "./useApi";

export const useSendPrayItem = () => {
  const { postFetcher } = useApi();
  return useMutation(async (data) => {
    return await postFetcher('/pray', data)}, {
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
  });
}
