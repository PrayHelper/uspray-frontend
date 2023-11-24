import { useMutation } from "react-query";
import useApi from './useApi';

export const useCompletePrayList = (data) => {
  const { putFetcher } = useApi();

  return useMutation(async (data) => {
    return await putFetcher('/pray/finish/'+data.id, data.id)}, {
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