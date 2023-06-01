import { useRecoilState } from "recoil";
import { tokenState } from "../recoil/accessToken";
import { putFetcher, refresh } from "./api";
import { useMutation } from "react-query";

const putHistory = async (accessToken, data) => {
  return await putFetcher('/history/modify', data, {
    Authorization: accessToken,
  });
};

export const useHistoryModify = (data) => {
  const [accessToken, setAccessToken] = useRecoilState(tokenState);
  return useMutation(() => {
    return putHistory(accessToken, data)}, {
      onError: (e) => {
        if (e.status === 403) {
          const data = refresh();
          if (typeof(data) === "string")
            setAccessToken(data);
        }
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
    });
}