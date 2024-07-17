import { useQuery, useMutation } from "react-query";
import useApi from "./useApi";
import useToast from "../hooks/useToast";
import { ToastTheme } from "../components/Toast/Toast";

export const useGroupPray = (groupId) => {
  const { getFetcher, postFetcher, deleteFetcher } = useApi();
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
        //console.log(res);
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
        //console.log(res);
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

  const { mutate: deleteGroupPray } = useMutation(
    async (groupPrayId) => {
      return await deleteFetcher(`/grouppray/${groupPrayId}`);
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        //console.log(res);
        refetchGroupPrayList();
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: likeGroupPray } = useMutation(
    async (groupPrayId) => {
      return await postFetcher(`/grouppray/${groupPrayId}/like`);
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        //console.log(res);
        refetchGroupPrayList();
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: scrapGroupPray } = useMutation(
    async (data) => {
      return await postFetcher(`/grouppray/scrap`, data);
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        //console.log(res);
        refetchGroupPrayList();
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: takePersonalPray } = useMutation(
    async (data) => {
      return await postFetcher("/grouppray/pray-to-grouppray", data);
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        //console.log(res);
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

  const groupPrayData = data?.data.data?.groupPray || {};
  const groupHeartCount = data?.data.data?.heartCount;
  const groupPrayList =
    Object.keys(groupPrayData).length === 0 ? {} : groupPrayData;
  const groupNotification = data?.data.data?.notificationAgree;

  return {
    groupPrayList,
    groupHeartCount,
    groupNotification,
    refetchGroupPrayList,
    addGroupPray,
    deleteGroupPray,
    likeGroupPray,
    scrapGroupPray,
    takePersonalPray,
  };
};
