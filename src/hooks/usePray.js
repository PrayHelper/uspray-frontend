import { useQuery } from "react-query";
import useApi from "./useApi";

export const usePray = (prayType) => {
  const { getFetcher } = useApi();

  const { data, refetch: refetchPrayList } = useQuery(
    ["prayList"],
    async () => {
      return await getFetcher(`/pray/?prayType=${prayType}`);
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

  const prayList = data?.data.data || [];

  return {
    prayList,
    refetchPrayList,
  };
};
