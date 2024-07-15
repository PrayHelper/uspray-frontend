import { useEffect } from "react";
import useSleep from "./useSleep";
import useCheckMobile from "./useCheckMobile";
import useToast from "./useToast";
import { ToastTheme } from "../components/Toast/Toast";

const nil = { isnil: true };

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
  const { showToast } = useToast({});

  const getDeviceToken = async () => {
    if (deviceToken.current != null) {
      return deviceToken.current;
    }

    if (isMobile()) {
      try {
        // Android
        //eslint-disable-next-line
        Bridge.AndroidGetDeviceToken();
      } catch (error) {
        console.log("Error Bridge.AndroidGetDeviceToken", error);
      }

      try {
        // Flutter
        //eslint-disable-next-line
        FlutterGetDeviceToken.postMessage(nil);
      } catch (error) {
        console.log("Error FlutterGetDeviceToken.postMessage(nil);", error);
      }

      deviceLock.current = true;
      try {
        await sleepWithCondition(() => deviceLock.current === false);
      } catch (error) {
        console.error("Error in getDeviceToken: ", error);
      } finally {
        deviceLock.current = false;
      }

      if (deviceToken.current) {
        return deviceToken.current;
      } else {
        showToast({
          message: "디바이스 토큰을 받아오지 못했습니다.",
          theme: ToastTheme.ERROR,
        });
        throw new Error("디바이스 토큰을 받아오지 못했습니다.");
      }
    } else {
      showToast({
        message: "푸쉬 알림은 모바일에서만 받을 수 있습니다.",
        theme: ToastTheme.ERROR,
      });
      throw new Error("푸쉬 알림은 모바일에서만 받을 수 있습니다.");
    }
  };

  useEffect(() => {
    // name should be modified to onReceiveDeviceToken
    window.onReceiveDeviceToken = (token) => {
      deviceToken.current = token;
      deviceLock.current = false;

      console.log(`onReceiveDeviceToken(${token}) called`);
    };
  }, []);

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
        // Android
        //eslint-disable-next-line
        Bridge.AndroidGetRefreshToken();
      } catch (error) {
        console.log("Error Bridge.AndroidGetRefreshToken", error);
      }

      try {
        // Flutter
        //eslint-disable-next-line
        FlutterGetAuthToken.postMessage(nil);
      } catch (error) {
        console.log("Error FlutterGetDeviceToken.postMessage(nil);", error);
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

  useEffect(() => {
    window.onReceiveAuthToken = (token) => {
      refreshToken.current = token;
      refreshLock.current = false;

      console.log(`onReceiveAuthToken(${token}) called`);
    };

    window.onReceiveTokenStoredAck = () => {
      console.log(`onReceiveTokenStoredAck() called`);
    };
  }, []);

  const storeMobileRefreshToken = async (token) => {
    if (isMobile()) {
      try {
        // Android
        //eslint-disable-next-line
        Bridge.AndroidStoreRefreshToken(token);
      } catch (error) {
        console.log("Error Bridge.AndroidStoreRefreshToken", error);
      }

      try {
        // Flutter
        //eslint-disable-next-line
        FlutterStoreAuthToken.postMessage(token);
      } catch (error) {
        console.log("Error FlutterStoreAuthToken.postMessage(token);", error);
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
