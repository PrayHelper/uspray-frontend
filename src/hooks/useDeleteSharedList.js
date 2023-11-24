import { useMutation } from "react-query";
import useApi from './useApi';

export const useDeleteSharedList = () => {
  const {deleteDataFetcher} = useApi();
  return useMutation(
    async (data) => {
      return await deleteDataFetcher("/share", data);
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
