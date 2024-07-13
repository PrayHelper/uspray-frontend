import useCheckMobile from "./useCheckMobile";

const useMobileShareMode = () => {
  const { isMobile } = useCheckMobile();

  const shareLink = ({ title, url }) => {
    const data = JSON.stringify({ title, url });

    if (isMobile()) {
      try {
        // Android
        //eslint-disable-next-line
        Bridge.AndroidShareLink(data);
      } catch (error) {
        console.log("Error Bridge.AndroidShareLink", error);
      }

      try {
        // Flutter
        //eslint-disable-next-line
        FlutterShareLink.postMessage(data);
      } catch (error) {
        console.log("FlutterShareLink.postMessage(data);", error);
      }
    } else {
      console.log("Not a mobile device, skipping Bridge.AndroidShareLink call");
    }
  };

  return {
    shareLink,
  };
};

export default useMobileShareMode;
