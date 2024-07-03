import { useQuery, useMutation, useQueryClient } from "react-query";
import useApi from "./useApi";
import useToast from "../hooks/useToast";
import { ToastTheme } from "../components/Toast/Toast";
import { usePray } from "./usePray";

export const useCategory = (categoryType) => {
  const { getFetcher, postFetcher, putFetcher, deleteFetcher } = useApi();
  const { showToast } = useToast({});
  const { refetchPrayList } = usePray(categoryType);

  const queryClient = useQueryClient();

  const { data, refetch: refetchCategoryList } = useQuery(
    ["categoryList", categoryType],
    async () => {
      return await getFetcher(`/category/?categoryType=${categoryType}`);
    },
    {
      onError: (e) => {
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

  const { mutate: updateCategoryOrder } = useMutation(
    async ({ srcIndex, destIndex }) => {
      let prevArrayData;

      try {
        // TODO: 살려주세요(.data, .data ..? Response Body에 대한 협의가 필요할듯)
        const arrayData = queryClient.getQueryData([
          "categoryList",
          categoryType,
        ]).data.data;

        // 반응성 개선을 위한 코드((update 요청 + refetch 요청) 완료 전에 프론트에서 먼저 완료 상태 보여주기)
        queryClient.setQueryData(["categoryList", categoryType], (prev) => {
          prevArrayData = prev.data.data;

          const nextArrayData = [...prevArrayData];
          nextArrayData.splice(srcIndex, 1);
          nextArrayData.splice(destIndex, 0, prevArrayData[srcIndex]);

          return { ...prev, data: { ...prev.data, data: nextArrayData } };
        });

        const categoryId = arrayData[srcIndex].id;
        const index = destIndex;

        return await putFetcher(
          `/category/${categoryId}/order/${index + 1}`,
          {}
        );
      } catch (error) {
        // 에러 발생 시 원상복구
        queryClient.setQueryData(["categoryList", categoryType], (prev) => {
          prevArrayData = prev.data.data;

          return { ...prev, data: { ...prev.data, data: prevArrayData } };
        });

        throw new Error();
      }
    },
    {
      onError: (e) => {
        showToast({
          message: "카테고리 순서 변경에 실패했어요. 네트워크를 확인해주세요.",
          theme: ToastTheme.ERROR,
        });
      },
      onSuccess: async () => {
        showToast({ message: "카테고리 순서를 변경했어요." });

        await refetchCategoryList();
        await queryClient.refetchQueries({ queryKey: ["prayList"] });
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
        if (e.response.status === 400) {
          showToast({
            message: "카테고리 이름이 중복되었어요.",
            theme: ToastTheme.ERROR,
          });
        }
      },
      onSuccess: (res) => {
        console.log(res);
        refetchCategoryList();
        refetchPrayList();
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

  const { mutate: changeCategory } = useMutation(
    async (data) => {
      return await putFetcher(`/category/${data.id}`, {
        name: data.name,
        color: data.color,
        type: data.type,
      });
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        console.log(res);
        refetchCategoryList();
        refetchPrayList();
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

  const { mutate: deleteCategory } = useMutation(
    async (categoryId) => {
      return await deleteFetcher(`/category/${categoryId}`);
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        console.log(res);
        refetchPrayList();
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
    deleteCategory,
    updateCategoryOrder,
  };
};
