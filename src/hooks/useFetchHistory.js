import { useQuery } from "react-query";
import useApi from './useApi';

export const useFetchHistory = (params) => {
  const { getFetcher } = useApi();
  return useQuery(
    ["History", params],
    async () => {
      return await getFetcher("/history", params);
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
