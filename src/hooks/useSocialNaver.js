import { useMutation } from "react-query";
import useApi from "./useApi";

const useSocialNameInput = ({ name, token }) => {
  const { putFetcher } = useApi();

  return useMutation(async () => {
    return (
      await putFetcher(
        `/member/oauth/${name}`,
        {},
        { accessToken: `Bearer ${token}`, Authorization: `Bearer ${token}` }
      ),
      {
        onError: (e) => {
          console.log(e);
        },
        onSuccess: (res) => {
          //console.log(res);
        },
        retry: (cnt) => {
          return cnt < 1;
        },
        retryDelay: 300,
      }
    );
  });
};

export default useSocialNameInput;
