import { useQuery } from "react-query";
import useApi from "./useApi";

export const useHistoryList = (options) => {
  const { getFetcher } = useApi();
  return useQuery(
    ["History", options],
    async () => {
      return await getFetcher("/history", options);
    },
    {
      onError: (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        // console.log(res);
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );
};
