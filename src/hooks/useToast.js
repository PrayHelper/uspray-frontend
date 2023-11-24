import { useEffect } from "react";
import Toast, { ToastTheme } from "../components/Toast/Toast";
import { useRecoilState } from "recoil";
import {
  toastMessageState,
  toastThemeState,
  toastVisibleState,
} from "../recoil/toast";

// hook을 불러올 때 초기값 지정(optional): message, theme
// 반환: setToastMessage, setToastTheme, showToast
const useToast = ({ initialMessage, initialTheme }) => {
  const [toastMessage, setToastMessage] = useRecoilState(toastMessageState);
  const [toastTheme, setToastTheme] = useRecoilState(toastThemeState);
  const [toastVisible, setToastVisible] = useRecoilState(toastVisibleState);

  // 초기화: null / undefined일 경우 기존 값 그대로
  useEffect(() => {
    setToastMessage(initialMessage ?? toastMessage);
    setToastTheme(initialTheme ?? toastTheme);
  }, []);

  useEffect(() => {
    if (toastVisible) {
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    }
  }, [toastVisible]);

  return {
    // null / undefined일 경우 기존 값 그대로
    showToast: ({ message, theme }) => {
      setToastMessage(message ?? toastMessage);
      setToastTheme(theme ?? toastTheme);
      setToastVisible(true);
    },
    renderToast: () =>
      toastVisible && <Toast toastTheme={toastTheme}>{toastMessage}</Toast>,
  };
};

export default useToast;
