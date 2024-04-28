import { useMutation } from "react-query";
import useApi from "./useApi";
import { useFetchSharedList } from "./useFetchSharedList";

export const useShare = () => {
  const { postFetcher } = useApi();
  const { refetchSharedListData } = useFetchSharedList();

  return useMutation(
    async (data) => {
      return await postFetcher("/share/receive", data);
    },
    {
      onError: (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        refetchSharedListData();
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );
};
