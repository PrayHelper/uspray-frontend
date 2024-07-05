import useCheckMobile from "./useCheckMobile";

const useMobileShareMode = () => {
  const { isMobile } = useCheckMobile();

  const shareLink = ({ title, url }) => {
    const data = JSON.stringify({ title, url });

    if (isMobile()) {
      try {
        //eslint-disable-next-line
        Bridge.AndroidShareLink(data);
      } catch (error) {
        console.log("Error Bridge.AndroidShareLink", error);
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
