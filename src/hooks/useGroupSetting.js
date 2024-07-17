import { useMutation } from "react-query";
import useApi from "./useApi";

export const useGroupSetting = () => {
  const { putFetcher, deleteFetcher, deleteDataFetcher } = useApi();

  const { mutate: changeGroupName } = useMutation(
    async (data) => {
      return await putFetcher(`/group/${data.groupId}/change-name`, {
        name: data.groupName,
      });
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

  const { mutate: changeGroupLeader } = useMutation(
    async (data) => {
      return await putFetcher(`/group/${data.groupId}/change-leader`, {
        memberId: data.leaderId,
      });
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

  const { mutate: kickGroupMember } = useMutation(
    async (data) => {
      return await deleteDataFetcher(`/group/${data.groupId}/kick`, {
        memberId: data.memberId,
      });
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

  const { mutate: deleteGroup } = useMutation(
    async (groupId) => {
      return await deleteFetcher(`/group/${groupId}`);
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

  return {
    changeGroupName,
    changeGroupLeader,
    kickGroupMember,
    deleteGroup,
  };
};
