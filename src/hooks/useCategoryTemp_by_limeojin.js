import { useQuery, useMutation, useQueryClient } from "react-query";
import useApi from "./useApi";
import useToast from "./useToast";
import { ToastTheme } from "../components/Toast/Toast";

export const categoryTypeConfig = {
  personal: "personal",
  shared: "shared",
};

export const useCategoryTemp_by_limeojin = ({ categoryType }) => {
  const { getFetcher, postFetcher, putFetcher } = useApi();
  const { showToast } = useToast({});

  const queryClient = useQueryClient();

  const { data: fetchedData, refetch } = useQuery(
    ["categoryList"],
    async () => {
      return await getFetcher(`/category?categoryType=${categoryType}`);
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

  const { mutate: updateCategoryOrder } = useMutation(
    async ({ srcIndex, destIndex }) => {
      let prevArrayData;

      try {
        // TODO: 살려주세요(.data, .data ..? Response Body에 대한 협의가 필요할듯)
        const arrayData = queryClient.getQueryData(["categoryList"]).data.data;

        // 반응성 개선을 위한 코드((update 요청 + refetch 요청) 완료 전에 프론트에서 먼저 완료 상태 보여주기)
        queryClient.setQueryData(["categoryList"], (prev) => {
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
        queryClient.setQueryData(["categoryList"], (prev) => {
          prevArrayData = prev.data.data;

          return { ...prev, data: { ...prev.data, data: prevArrayData } };
        });

        throw new Error();
      }
    },
    {
      onError: () => {
        showToast({
          message: "카테고리 순서 변경에 실패했어요. 네트워크를 확인해주세요.",
          theme: ToastTheme.ERROR,
        });
      },
      onSuccess: async () => {
        showToast({ message: "카테고리 순서를 변경했어요." });

        await refetch();
        await queryClient.refetchQueries({ queryKey: ["prayList"] });
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const categoryList = fetchedData?.data.data || [];
  const firstCategoryIndex =
    categoryList.length > 0 ? categoryList[0].id : null;

  return {
    categoryList,
    createCategory,
    updateCategoryOrder,
    firstCategoryIndex,
  };
};
