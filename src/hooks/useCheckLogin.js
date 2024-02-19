import { useQuery } from 'react-query';
import useApi from './useApi';

export const useCheckLogin = () => {
  const { getFetcher } = useApi();

  const { data } = useQuery(
    ['CheckLogin'],
    async () => {
      return await getFetcher(`/auth/login-check`)
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

  const isSocialLogin = data?.data.data || {};

  return {
    isSocialLogin
  };
}
