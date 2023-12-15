import { useQuery } from 'react-query';
import useApi from './useApi';

export const useSearchGroupMember = (groupId, name) => {
  const { getFetcher } = useApi();
  const { data, refetch } = useQuery(
    ['groupMemberSearch', groupId, name],
    async () => {
      return await getFetcher(`/group/${groupId}/member/search?name=${name}`)
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
  
  const memberList = data?.data || [];

  return {
    memberList,
    refetch
  }
}