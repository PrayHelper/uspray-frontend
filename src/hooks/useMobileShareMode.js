import useCheckMobile from "./useCheckMobile";

const useMobileShareMode = () => {
  const { isMobile } = useCheckMobile();

  const shareLink = ({ type, data }) => {
    if (isMobile()) {
      if (type === "LINK") {
        try {
          // Android
          //eslint-disable-next-line
          Bridge.AndroidShareLink(data); // data {title, url}
        } catch (error) {
          console.log("Error Bridge.AndroidShareLink", error);
        }
      } else if (type === "KAKAO") {
        try {
          // Android
          //eslint-disable-next-line
          Bridge.AndroidKakaoShareLink(data); // data {examplePrayList, url}
        } catch (error) {
          console.log("Error Bridge.AndroidKakaoShareLink", error);
        }
      }
    } else {
      console.log(
        "Not a mobile device, skipping Bridge.AndroidShareLink or Bridge.AndroidKakaoShareLink call"
      );
    }
  };

  return {
    shareLink,
  };
};

export default useMobileShareMode;
