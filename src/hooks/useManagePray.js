import { useMutation } from "react-query";
import useApi from "./useApi";
import useToast from "./useToast";

export const usePrayDelete = () => {
  const { putFetcher, deleteFetcher } = useApi();
  const { showToast } = useToast({});

  const { mutate: deletePray } = useMutation(
    async (data) => {
      return await deleteFetcher(`/pray/${data.id}`);
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
