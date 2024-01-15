import { useMutation } from 'react-query';
import useApi from './useApi';

export const useCategorySetting = () => {
  const { putFetcher, deleteFetcher } = useApi();

  const { mutate: changeCategory }  = useMutation(
    async (data) => {
      return await putFetcher(`/category/${data.id}`, {name: data.name, color: data.color, type: data.type})
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

  const { mutate: deleteCategory }  = useMutation(
    async (categoryId) => {
      return await deleteFetcher(`/category/${categoryId}`)
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
    changeCategory,
    deleteCategory
  };
}

