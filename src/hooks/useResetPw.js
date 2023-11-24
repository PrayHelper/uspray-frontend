import { useMutation } from "react-query";
import useApi from './useApi';

export const useResetPw = (data) => {
  const { putFetcher } = useApi();
  return useMutation(async () => {
    return await putFetcher('/user/reset/password', data)
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