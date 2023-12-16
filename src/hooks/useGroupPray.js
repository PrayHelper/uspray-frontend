import { useQuery, useMutation } from 'react-query';
import useApi from './useApi';

export const useGroupPray = (groupId) => {
  const { getFetcher, postFetcher } = useApi();

  const { data, refetch: refetchGroupPrayList } = useQuery(
    ['groupPrayList', groupId],
    async () => {
      return await getFetcher(`/grouppray/${groupId}`)
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

  const groupPrayData = data?.data.data || {};
  const groupPrayList = Object.keys(groupPrayData).length === 0
    ? [] : groupPrayData;

  return {
    groupPrayList,
    refetchGroupPrayList,
  };
}
