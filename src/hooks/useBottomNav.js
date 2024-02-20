import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { visibleState } from "../recoil/bottomNav";

const useBottomNav = () => {
  const [isVisible, setIsVisible] = useRecoilState(visibleState);

  // 초기화: true
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return {
    isVisible,
    setIsVisible,
  };
};

export default useBottomNav;
