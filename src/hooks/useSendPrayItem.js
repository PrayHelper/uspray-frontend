import { useMutation } from "react-query";
import useApi from "./useApi";
import useToast from "./useToast";
import { ToastTheme } from "../components/Toast/Toast";

export const useSendPrayItem = () => {
  const { postFetcher, putFetcher, deleteFetcher } = useApi();
  const { showToast } = useToast({});

  const { mutate: createPray } = useMutation(
    async (data) => {
      return await postFetcher("/pray", data);
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        console.log(res);
        showToast({
          message: "기도제목이 저장되었어요.",
          theme: ToastTheme.SUCCESS,
        });
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: deletePray } = useMutation(
    async (data) => {
      return await deleteFetcher(`/pray/${data}`);
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

  return {
    createPray,
    deletePray,
  };
};
