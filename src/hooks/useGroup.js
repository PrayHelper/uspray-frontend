import { useQuery, useMutation } from 'react-query';
import useApi from './useApi';

export const useGroup = () => {
  const { getFetcher, postFetcher } = useApi();

  const { mutate: createGroup }  = useMutation(
    async (data) => {
      return await postFetcher('/group', data)
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

  const { data: groupList } = useQuery(
    ['groupList'],
    async () => {
      return await getFetcher(`/group`)
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
      groupList,
      createGroup,
    };
}
