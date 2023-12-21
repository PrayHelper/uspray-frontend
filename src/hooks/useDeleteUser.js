import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import useApi from "./useApi";

export const useDeleteUser = (data) => {
  const { postFetcher } = useApi();

  const deleteUserCall = (d) => {
    const url = `/auth/withdrawal`;

    return postFetcher(url, data);
  };

  const navigate = useNavigate();

  const options = {
    onError: async (e) => {
      console.log(e);
    },
    onSuccess: (res) => {
      console.log(res);
      navigate("/");
    },
    retry: (cnt) => {
      return cnt < 3;
    },
    retryDelay: 300,
    refetchOnWindowFocus: false,
  };

  return useMutation(deleteUserCall, options);
};
