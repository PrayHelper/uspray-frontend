import {useEffect} from 'react';
import {atom, useAtom} from 'jotai';

const useBottomNav = () => {
  const visibleAtom = atom(true);
  const [isVisible, setIsVisible] = useAtom(visibleAtom);
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
