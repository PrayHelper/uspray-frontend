import { ToastStyle } from "./style";

export const ToastTheme = {
  SUCCESS: 0,
  ERROR: 1,
};

Object.freeze(ToastTheme);

const Toast = ({ toastTheme, children }) => {
  // toastTheme이 null / undefined일 경우 SUCCESS 사용
  toastTheme ??= ToastTheme.SUCCESS;

  return (
    <ToastStyle toastTheme={toastTheme}>
      {toastTheme === ToastTheme.ERROR ? (
        <img src="images/icon_error.svg" alt="error_icon" />
      ) : (
        <img src="images/icon_check.svg" alt="check_icon" />
      )}
      {children}
    </ToastStyle>
  );
};

export default Toast;
