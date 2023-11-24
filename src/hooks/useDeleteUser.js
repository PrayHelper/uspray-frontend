import { useNavigate } from "react-router-dom";
import { deleteDataFetcher } from "./api";
import { useMutation } from "react-query";
import useAuthToken from "./useAuthToken";
import useRefresh from "./useRefresh";

export const useDeleteUser = (data) => {
  const { getAccessToken } = useAuthToken();
  const { refresh } = useRefresh();

  const deleteUserCall = (d) => {
    const url = `/user/withdrawal`;
    const headers = {
      Authorization: getAccessToken(),
    };

    console.log({ url, data, headers });

    return deleteDataFetcher(url, data, headers);
  };

  const navigate = useNavigate();

  const options = {
    onError: async (e) => {
      if (e.status === 403) {
        await refresh();
      }
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
