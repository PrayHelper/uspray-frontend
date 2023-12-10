import { useQuery, useMutation } from 'react-query';
import useApi from './useApi';
import { useNavigate } from 'react-router-dom';
import useToast from '../hooks/useToast';
import { ToastTheme } from '../components/Toast/Toast';

export const useGroupSetting = () => {
  const { putFetcher } = useApi();
  const navigate = useNavigate();
  const { showToast } = useToast({});

  const { mutate: changeGroupName }  = useMutation(
    async (groupId) => {
      return await putFetcher(`/group/${groupId}/change-name`)
    },
    {
      onError: async (e) => {
        console.log(e);
      },
      onSuccess: (res) => {
        console.log(res);
        showToast({
          message: "모임 이름이 변경되었어요.",
          theme: ToastTheme.SUCCESS,
        });
        navigate('/groupDetail');
      },
      retry: (cnt) => {
        return cnt < 3;
      },
      retryDelay: 300,
      refetchOnWindowFocus: false,
    }
  );

  return {
    changeGroupName,
  };
}