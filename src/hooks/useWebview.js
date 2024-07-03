import { useEffect } from "react";
import useSleep from "./useSleep";

const nil = { isnil: true };

let deviceToken = {
  current: null,
};

let authToken = {
  current: null,
};

let deviceLock = {
  current: null,
};

let authLock = {
  current: null,
};

const useDeviceToken = () => {
  const { sleepWithCondition } = useSleep();

  const getDeviceToken = async () => {
    if (deviceToken.current != null) {
      return deviceToken.current;
    }

    try {
      //eslint-disable-next-line
      Bridge.AndroidGetDeviceToken(null);
    } catch (error) {
      console.log("Bridge.AndroidGetDeviceToken(null);", error);
    }

    deviceLock.current = true;
    try {
      await sleepWithCondition(() => deviceLock.current === false);
    } catch (error) {
      console.error("sleepWithCondition", error);
    }

    console.log(`getDeviceToken() returned ${deviceToken.current}`);
    return deviceToken.current;
  };

  // name should be modified to onReceiveDeviceToken
  window.onReceiveDeviceToken3 = (token) => {
    deviceToken.current = token;
    deviceLock.current = false;

    console.log(`onReceiveDeviceToken3(${token}) called`);
  };

  useEffect(() => {
    window.onReceiveDeviceToken4 = (token) => {
      deviceToken.current = token;
      deviceLock.current = false;

      console.log(`onReceiveDeviceToken4(${token}) called`);
    };
  }, []);

  return {
    getDeviceToken,
  };
};

const useAuthToken = () => {
  const { sleepWithCondition } = useSleep();

  // Return nullstring if there is no auth token stored in device.
  const getAuthToken = async () => {
    if (authToken.current != null) {
      return authToken.current;
    }

    /* android, ios 버전으로 새롭게 개발 필요
      try {
        //eslint-disable-next-line
        FlutterGetAuthToken.postMessage(nil);
      } catch (error) {
        console.log("FlutterGetAuthToken.postMessage(nil);", error);
      }
      */

    authLock.current = true;
    try {
      await sleepWithCondition(() => authLock.current === false);
    } catch (error) {
      console.error("sleepWithCondition", error);
    }

    console.log(`getAuthToken() returned ${authToken.current}`);
    return authToken.current;
  };

  const storeAuthToken = (token) => {
    authToken.current = token;
    //eslint-disable-next-line
    FlutterStoreAuthToken.postMessage(token);
  };

  useEffect(() => {
    window.onReceiveAuthToken = (token) => {
      authToken.current = token;
      authLock.current = false;

      console.log(`onReceiveAuthToken(${token}) called`);
    };

    window.onReceiveTokenStoredAck = () => {
      console.log(`onReceiveTokenStoredAck() called`);
    };
  }, []);

  return {
    getAuthToken,
    storeAuthToken,
  };
};

const useShareLink = () => {
  const shareLink = ({ title, url }) => {
    const data = JSON.stringify({ title, url });
    //eslint-disable-next-line
    FlutterShareLink.postMessage(data);

    console.log(`FlutterShareLink`);
    //eslint-disable-next-line
    window.Bridge.FlutterShareLink(data);
  };

  return {
    shareLink,
  };
};

const useWebview = () => {
  const isMobile = () => {
    const checkUserAgent = () => {
      return navigator.userAgent.match(
        /Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/
      );
    };

    if (checkUserAgent()) {
      return true;
    } else {
      return false;
    }
  };

  // name should be modified to onReceiveDeviceToken
  window.onReceiveDeviceToken1 = (token) => {
    deviceToken.current = token;
    deviceLock.current = false;

    console.log(`onReceiveDeviceToken1(${token}) called`);
  };

  useEffect(() => {
    window.onReceiveDeviceToken2 = (token) => {
      deviceToken.current = token;
      deviceLock.current = false;

      console.log(`onReceiveDeviceToken2(${token}) called`);
    };
  }, []);

  const { getDeviceToken } = useDeviceToken();
  const { getAuthToken, storeAuthToken } = useAuthToken();
  const { shareLink } = useShareLink();

  return {
    isMobile,
    getDeviceToken,
    getAuthToken,
    storeAuthToken,
    shareLink,
  };
};

export default useWebview;
