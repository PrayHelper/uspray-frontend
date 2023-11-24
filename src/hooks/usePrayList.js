import { useQuery } from 'react-query';
import useApi from './useApi';

export const usePrayList = (sort_by) => {
  const { getFetcher } = useApi();
  return useQuery(['prayList','sort_by'],
    async () => {
      return await getFetcher(`/pray?sort_by=${sort_by}`)},
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
    })
}