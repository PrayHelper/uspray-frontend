import { useMutation } from "react-query";
import useApi from './useApi';

export const useChangeValue = () => {
  const { putFetcher } = useApi();

  return useMutation(async ({id, data}) => {
    return await putFetcher(`/pray/my/${id}`, data)}, {
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
  });
}