import useSleep from "./useSleep";
import useCheckMobile from "./useCheckMobile";

let deviceToken = {
  current: null,
};

let deviceLock = {
  current: null,
};

let refreshToken = {
  current: null,
};

let refreshLock = {
  current: null,
};

const useMobileToken = () => {
  const { sleepWithCondition } = useSleep();
  const { isMobile } = useCheckMobile();

  const getDeviceToken = async () => {
    if (deviceToken.current != null) {
      return deviceToken.current;
    }

    if (isMobile()) {
      try {
        //eslint-disable-next-line
        Bridge.AndroidGetDeviceToken();
      } catch (error) {
        console.log("Error Bridge.AndroidGetDeviceToken", error);
      }

      deviceLock.current = true;
      try {
        await sleepWithCondition(() => deviceLock.current === false);
      } catch (error) {
        console.error("Error in getDeviceToken: ", error);
      } finally {
        deviceLock.current = false;
      }
    } else {
      console.log(
        "Not a mobile device, skipping Bridge.AndroidGetDeviceToken call"
      );
    }

    return deviceToken.current;
  };

  // name should be modified to onReceiveDeviceToken
  window.onReceiveDeviceToken = (token) => {
    deviceToken.current = token;
    deviceLock.current = false;

    console.log(`onReceiveDeviceToken(${token}) called`);
  };

  const getMobileRefreshToken = async () => {
    if (refreshToken.current != null) {
      return refreshToken.current;
    }

    if (isMobile()) {
      try {
        //eslint-disable-next-line
        Bridge.AndroidGetRefreshToken();
      } catch (error) {
        console.log("Error Bridge.AndroidGetRefreshToken", error);
      }

      refreshLock.current = true;
      try {
        await sleepWithCondition(() => refreshLock.current === false);
      } catch (error) {
        console.error("Error in getRefreshToken: ", error);
      } finally {
        refreshLock.current = false;
      }
    } else {
      console.log(
        "Not a mobile device, skipping Bridge.AndroidGetRefreshToken call"
      );
    }

    return refreshToken.current;
  };

  // name should be modified to onReceiveRefreshToken
  window.onReceiveRefreshToken = (token) => {
    refreshToken.current = token;
    refreshLock.current = false;

    console.log(`onReceiveRefreshToken(${token}) called`);
  };

  const storeMobileRefreshToken = async (token) => {
    if (isMobile()) {
      try {
        //eslint-disable-next-line
        Bridge.AndroidStoreRefreshToken(token);
      } catch (error) {
        console.log("Error Bridge.AndroidStoreRefreshToken", error);
      }
    } else {
      console.log(
        "Not a mobile device, skipping Bridge.AndroidStoreRefreshToken call"
      );
    }
  };

  return {
    getDeviceToken,
    getMobileRefreshToken,
    storeMobileRefreshToken,
  };
};

export default useMobileToken;
