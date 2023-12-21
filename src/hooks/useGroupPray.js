import { useQuery, useMutation } from "react-query";
import useApi from "./useApi";
import useToast from "../hooks/useToast";
import { ToastTheme } from "../components/Toast/Toast";

export const useGroupPray = (groupId) => {
  const { getFetcher, postFetcher } = useApi();
  const { showToast } = useToast({});

  const { data, refetch: refetchGroupPrayList } = useQuery(
    ["groupPrayList", groupId],
    async () => {
      return await getFetcher(`/grouppray/${groupId}`);
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

  const { mutate: addGroupPray } = useMutation(
    async (data) => {
      return await postFetcher("/grouppray", data);
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        console.log(res);
        refetchGroupPrayList();
        showToast({
          message: "기도제목이 모임원들에게 공유되었어요.",
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

  const groupPrayData = data?.data.data || {};
  const groupPrayList =
    Object.keys(groupPrayData).length === 0 ? [] : groupPrayData;

  return {
    groupPrayList,
    refetchGroupPrayList,
    addGroupPray,
  };
};
