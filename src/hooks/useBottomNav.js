import {useEffect} from 'react';
import {atom, useAtomValue, useSetAtom} from 'jotai';

const useBottomNav = () => {
  const visibleAtom = atom(true);
  const isVisible = useAtomValue(visibleAtom);
  const setIsVisible = useSetAtom(visibleAtom);
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
