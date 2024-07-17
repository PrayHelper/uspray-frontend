import { useQuery } from "react-query";
import useApi from "./useApi";

export const useUserName = () => {
  const { getFetcher } = useApi();
  const { data } = useQuery(
    ["userName"],
    async () => {
      return await getFetcher(`/auth/name`);
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        //console.log(res);
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const userName = data?.data.data.name || "";

  return { userName };
};
