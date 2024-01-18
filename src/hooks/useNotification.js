import { useQuery, useMutation } from 'react-query';
import useApi from './useApi';

export const useNotification = () => {
  const { getFetcher, postFetcher } = useApi();

  const { data, refetch: refetchIsNotifiedData } = useQuery(
    ['FetchNotifications'],
    async () => {
      return await getFetcher(`/member/notification-setting`)
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

  const { mutate: setNotification }  = useMutation(
    async (data) => {
      return await postFetcher('/member/notification-setting', data)
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        console.log(res);
        refetchIsNotifiedData();
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const isNotifiedData = data?.data.data;

  return {
    isNotifiedData,
    refetchIsNotifiedData,
    setNotification
  };
}
