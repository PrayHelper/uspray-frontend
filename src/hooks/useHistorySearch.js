import { useMutation } from "react-query";
import useApi from "./useApi";

export const useHistorySearch = () => {
  const { postFetcher } = useApi();

  const { mutate: searchHistory } = useMutation(
    async (data) => {
      return await postFetcher("/history/search", data);
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

  return {
    searchHistory,
  };
};
