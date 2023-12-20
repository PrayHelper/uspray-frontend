import { useQuery, useMutation } from "react-query";
import useApi from "./useApi";
import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import { ToastTheme } from "../components/Toast/Toast";

export const useCategory = () => {
  const { getFetcher, postFetcher } = useApi();
  const navigate = useNavigate();
  const { showToast } = useToast({});

  const { data, refetch } = useQuery(
    ["categoryList"],
    async () => {
      return await getFetcher(`/category`);
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

  const { mutate: createCategory } = useMutation(
    async (data) => {
      return await postFetcher("/category", data);
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        console.log(res);
        refetch();
        showToast({
          message: "카테고리를 생성했어요.",
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

  const categoryList = data?.data.data || [];
  const firstCategoryIndex =
    categoryList.length > 0 ? categoryList[0].id : null;

  return {
    categoryList,
    createCategory,
    firstCategoryIndex,
  };
};
