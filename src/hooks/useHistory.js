import { useMutation } from "react-query";
import useApi from "./useApi";
import useToast from "./useToast";
import { ToastTheme } from "../components/Toast/Toast";

export const useHistory = () => {
  const { postFetcher } = useApi();
  const { showToast } = useToast({});

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

  const { mutate: oneMorePray } = useMutation(
    async (data) => {
      return await postFetcher(`/history/pray/${data.historyId}`, {
        content: data.content,
        deadline: data.deadline,
        categoryId: data.categoryId,
      });
    },
    {
      onError: async (e) => {
        console.log(e);
        showToast({
          message: e.response.data.message,
          theme: ToastTheme.ERROR,
        });
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
    oneMorePray,
  };
};
