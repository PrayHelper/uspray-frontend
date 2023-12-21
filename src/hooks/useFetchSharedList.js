import { useQuery } from "react-query";
import useApi from './useApi';

export const useFetchSharedList = () => {
  const { getFetcher } = useApi();

  const { data, refetch: refetchSharedListData } = useQuery(
    ["SharedList"],
    async () => {
      return await getFetcher("/share");
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

  const sharedListData = data?.data.data || [];

  return {
    sharedListData,
    refetchSharedListData,
  }
};
