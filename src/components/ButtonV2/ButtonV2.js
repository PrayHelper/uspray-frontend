import { ButtonStyle } from "./style";

export const ButtonTheme = {
  FILLED: 0,
  OUTLINED: 1,
};

Object.freeze(ButtonTheme);

const ButtonV2 = ({
  buttonTheme = ButtonTheme.FILLED,
  disabled,
  handler,
  children,
}) => {
  return (
    <ButtonStyle
      buttonTheme={buttonTheme}
      disabled={disabled}
      onClick={handler}
    >
      {children}
    </ButtonStyle>
  );
};

export default ButtonV2;
