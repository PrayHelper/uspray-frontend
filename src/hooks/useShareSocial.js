import { useQuery } from 'react-query';
import useApi from './useApi';

const getShareSocial = async (getFetcher, data) => {
  const dataJoin = data.join("%2C")
  return await getFetcher(`/share/social?pray_list=${dataJoin}`);
}

export const useShareSocial = (data) => {
  const { getFetcher } = useApi();
  return useQuery(["pray_list", data], () => 
  {return getShareSocial(getFetcher, data)}, {
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