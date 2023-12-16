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

  const groupPrayList = data?.data.data || [];

  return {
    groupPrayList,
    refetchGroupPrayList,
  };
}
