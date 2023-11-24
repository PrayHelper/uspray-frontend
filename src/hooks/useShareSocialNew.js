import { useMutation } from "react-query";
import useApi from './useApi';

export const useShareSocialNew = () => {
    const { postFetcher } = useApi();
    return useMutation(
        async (data) => {
            return await postFetcher("/share/social/new", data);
        },
        {
            onError: (e) => {
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
};
