import { useQuery, useMutation } from 'react-query';
import useApi from './useApi';
import { useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';
import { ToastTheme } from '../components/Toast/Toast';

export const useGroup = () => {
  const { getFetcher, postFetcher, deleteFetcher } = useApi();
  const navigate = useNavigate();
  const { showToast } = useToast({});

  const { data, refetch: refetchGroupList } = useQuery(
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
        refetchGroupList();
        showToast({
          message: "모임을 생성했어요.",
          theme: ToastTheme.SUCCESS,
        });
        navigate('/group');
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: leaveGroup }  = useMutation(
    async (groupId) => {
      return await deleteFetcher(`/group/${groupId}/leave`)
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        console.log(res);
        refetchGroupList();
        showToast({
          message: "모임에서 나갔어요.",
          theme: ToastTheme.SUCCESS,
        });
        navigate('/group');
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  const groupList = data?.data.data.groupList || [];

  return {
    groupList,
    refetchGroupList,
    createGroup,
    leaveGroup,
  };
}
