import {useEffect} from 'react';
import Toast, {ToastTheme} from '../components/Toast/Toast';
import {atom, useAtom} from 'jotai';
const toastMessageState = atom('Plaese Initialize toastMessage!!!');
const toastThemeState = atom(ToastTheme.SUCCESS);
const toastVisibleState = atom(false);

// hook을 불러올 때 초기값 지정(optional): message, theme
// 반환: setToastMessage, setToastTheme, showToast
const useToast = ({initialMessage, initialTheme}) => {
  const [toastMessage, setToastMessage] = useAtom(toastMessageState);
  const [toastTheme, setToastTheme] = useAtom(toastThemeState);
  const [toastVisible, setToastVisible] = useAtom(toastVisibleState);

  // 초기화: null / undefined일 경우 기존 값 그대로
  useEffect(() => {
    setToastMessage(initialMessage ?? toastMessage);
    setToastTheme(initialTheme ?? toastTheme);
  }, []);

  useEffect(() => {
    let timer;

    if (toastVisible) {
      timer = setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [toastVisible]);

  return {
    // null / undefined일 경우 기존 값 그대로
    showToast: ({message, theme}) => {
      setToastMessage(message ?? toastMessage);
      setToastTheme(theme ?? toastTheme);

      if (!toastVisible) {
        setToastVisible(true);
      } else {
        setToastVisible(false);
        // setTimeout: to avoid batching
        setTimeout(() => {
          setToastVisible(true);
        });
      }
    },
    renderToast: () =>
      toastVisible && <Toast toastTheme={toastTheme}>{toastMessage}</Toast>,
  };
};

export default useToast;
