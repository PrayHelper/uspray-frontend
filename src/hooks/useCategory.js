import { useQuery, useMutation } from "react-query";
import useApi from "./useApi";
import useToast from "../hooks/useToast";
import { ToastTheme } from "../components/Toast/Toast";

export const useCategory = (categoryType) => {
  const { getFetcher, postFetcher, putFetcher, deleteFetcher } = useApi();
  const { showToast } = useToast({});

  const { data, refetch: refetchCategoryList } = useQuery(
    ["categoryList"],
    async () => {
      return await getFetcher(`/category/?categoryType=${categoryType}`);
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
        refetchCategoryList();
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

  const { mutate: changeCategory }  = useMutation(
    async (data) => {
      return await putFetcher(`/category/${data.id}`, {name: data.name, color: data.color, type: data.type})
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        console.log(res);
        refetchCategoryList();
        showToast({
          message: "카테고리를 수정했어요.",
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

  const { mutate: deleteCategory }  = useMutation(
    async (categoryId) => {
      return await deleteFetcher(`/category/${categoryId}`)
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        console.log(res);
        refetchCategoryList();
        showToast({
          message: "카테고리를 삭제했어요.",
          theme: ToastTheme.ERROR,
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
    refetchCategoryList,
    createCategory,
    firstCategoryIndex,
    changeCategory,
    deleteCategory
  };
};
