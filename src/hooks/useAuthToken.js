import { useRef } from "react";
import { useEffect } from "react";
import useSleep from "./useSleep";
import useCheckMobile from "./useCheckMobile";
import useMobileToken from "./useMobileToken";

const accessToken = {
  current: "",
};

const useAuthToken = () => {
  const { sleepWithCondition } = useSleep();
  const { isMobile } = useCheckMobile();
  const { getMobileRefreshToken, storeMobileRefreshToken } = useMobileToken();
  const muLock = useRef(false);

  const getAccessToken = () => {
    console.log(`getAccessToken: ${accessToken.current}`);
    return accessToken.current;
  };

  const setAccessToken = (token) => {
    console.log(`setAccessToken: ${token}`);
    accessToken.current = token;
  };

  const getWebRefreshToken = async () => {
    await sleepWithCondition(() => muLock.current === false);
    return localStorage.getItem("refreshToken");
  };

  const storeWebRefreshToken = (token) => {
    localStorage.setItem("refreshToken", token);
  };

  const getRefreshToken = async () => {
    if (isMobile()) {
      return await getMobileRefreshToken();
    } else {
      return await getWebRefreshToken();
    }
  };

  const setRefreshToken = async (token) => {
    if (isMobile()) {
      muLock.current = true;
      storeMobileRefreshToken(token);
    } else {
      storeWebRefreshToken(token);
    }
  };

  useEffect(() => {
    window.alertStoringTokenFinished = () => {
      muLock.current = false;
    };
  }, []);

  return {
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
  };
};

export default useAuthToken;
