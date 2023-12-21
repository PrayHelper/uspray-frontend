import { useMutation } from "react-query";
import useApi from './useApi';

export const useResetPhoneNumber = () => {
  const { postFetcher } = useApi();
  return useMutation(async (data) => {
    return await postFetcher(`/member/${data}`)
  }, {
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (res) => {
      console.log(res);
    },
    retry: (cnt) => {
      return cnt < 1;
    },
    retryDelay: 300,
  });
}