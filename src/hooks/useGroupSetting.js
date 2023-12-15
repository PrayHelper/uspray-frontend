import { useQuery, useMutation } from 'react-query';
import useApi from './useApi';

export const useGroupSetting = () => {
  const { putFetcher } = useApi();

  const { mutate: changeGroupName }  = useMutation(
    async (data) => {
      return await putFetcher(`/group/${data.groupId}/change-name`, {name: data.groupName})
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

  return {
    changeGroupName,
  };
}