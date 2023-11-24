import { useQuery } from "react-query";
import useApi from './useApi';

export const useFetchNotifications = () => {
  const { getFetcher } = useApi();
  return useQuery(
    ["FetchNotifications"],
    async () => {
      return await getFetcher("/user/notifications");
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
