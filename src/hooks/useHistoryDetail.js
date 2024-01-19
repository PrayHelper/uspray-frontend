import { useQuery } from "react-query";
import useApi from "./useApi";

export const useHistoryDetail = (historyId) => {
  const { getFetcher } = useApi();

  const { data, refetch } = useQuery(
    ["History", historyId],
    async () => {
      if (historyId !== null) {
        return await getFetcher(`/history/detail/${historyId}`);
      } else {
        // historyId가 null이면 데이터를 호출하지 않고 빈 객체를 반환
        return {};
      }
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

  const historyDetail = data?.data.data || {};

  return {
    historyDetail,
    refetch,
  };
};
