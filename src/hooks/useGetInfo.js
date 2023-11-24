import { useQuery } from 'react-query';
import useApi from './useApi';

export const useGetInfo = () => {
  const { getFetcher } = useApi();
  return useQuery([], async () => {return await getFetcher(`/user/info`)}, {
    onError: (e) => {
      console.log(e);
    },
    onSuccess: (res) => {
    //   console.log(res);
    },
    retry: (cnt) => {
      return cnt < 3;
    },
    retryDelay: 300,
    refetchOnWindowFocus: false,
  })
}