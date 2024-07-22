import { useQuery, useMutation } from "react-query";
import useApi from "./useApi";
import useToast from "./useToast";
import { ToastTheme } from "../components/Toast/Toast";
import { useAtom } from "jotai";
import {
  groupIdAtom,
  selectionModeAtom,
} from "../overlays/SelectionModal/useSelectionModal";

export const usePray = (tab) => {
  const { getFetcher, postFetcher, putFetcher, deleteFetcher } = useApi();
  const { showToast } = useToast({});
  const [mode] = useAtom(selectionModeAtom);
  const [groupId] = useAtom(groupIdAtom);

  const { data, refetch: refetchPrayList } = useQuery(
    ["prayList", tab],
    async () => {
      const endpoint =
        mode === "BRING"
          ? `/grouppray?prayType=${tab}&groupId=${groupId}`
          : `/pray?prayType=${tab}`;
      return await getFetcher(endpoint);
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

  const { mutate: createPray } = useMutation(
    async (data) => {
      return await postFetcher("/pray", data);
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
        //console.log(res);
        showToast({
          message: "기도제목이 저장되었어요.",
          theme: ToastTheme.SUCCESS,
        });
        refetchPrayList();
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
        showToast({
          message: e.response.data.message,
          theme: ToastTheme.ERROR,
        });
      },
      onSuccess: (res) => {
        //console.log(res);
        showToast({
          message: "기도제목을 삭제했어요.",
          theme: ToastTheme.SUCCESS,
        });
        refetchPrayList();
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: completePray } = useMutation(
    async (data) => {
      return await putFetcher(`/pray/${data}/complete`);
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
        //console.log(res);
        refetchPrayList();
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: modifyPray } = useMutation(
    async (data) => {
      return await putFetcher(`/pray/${data.prayId}`, {
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
        //console.log(res);
        showToast({
          message: "기도제목이 수정되었어요.",
          theme: ToastTheme.SUCCESS,
        });
        refetchPrayList();
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: todayPray } = useMutation(
    async (prayId) => {
      return await putFetcher(`/pray/${prayId}/today`);
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
        //console.log(res);
        refetchPrayList();
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: cancelPray } = useMutation(
    async (prayId) => {
      return await putFetcher(`/pray/${prayId}/cancel`);
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
        //console.log(res);
        refetchPrayList();
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const prayList = data?.data.data || [];

  return {
    prayList,
    refetchPrayList,
    createPray,
    deletePray,
    completePray,
    modifyPray,
    todayPray,
    cancelPray,
  };
};
