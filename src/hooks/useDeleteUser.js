import { useMutation } from "react-query";
import useApi from "./useApi";

export const useDeleteUser = ({ reqData, onSuccess }) => {
  const { postFetcher } = useApi();

  const deleteUserCall = () => {
    const url = `/auth/withdrawal`;

    return postFetcher(url, reqData);
  };

  const options = {
    onError: async (e) => {
      console.log(e);
    },
    onSuccess,
    retry: (cnt) => {
      return cnt < 3;
    },
    retryDelay: 300,
    refetchOnWindowFocus: false,
  };

  return useMutation(deleteUserCall, options);
};
