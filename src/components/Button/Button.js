import { BaseButtonStyle, ModalButton } from "./style";
import styled from "styled-components";
import { ReactComponent as NextArrow } from "../../images/next_arrow.svg";

const NextArrowStyle = styled.div`
  display: ${(props) => (props.isArrow ? "block" : "none")};
  marign-right: 10px;
`;

export const ButtonSize = {
  NORMAL: 0,
  LARGE: 1,
  MODAL: 2,
};

export const ButtonTheme = {
  GREEN: 0,
  GRAY: 1,
  RED: 2,
  WHITE: 3,
  LIGHT_GREEN: 4,
};

Object.freeze(ButtonSize);
Object.freeze(ButtonTheme);

const Button = ({
  buttonSize,
  buttonTheme,
  disabled,
  handler,
  isArrow = false,
  children,
}) => {
  if (!buttonSize) {
    buttonSize = ButtonSize.NORMAL;
  }
  if (!buttonTheme) {
    buttonTheme = ButtonTheme.GREEN;
  }

  return buttonSize === ButtonSize.MODAL ? (
    <ModalButton
      buttonSize={buttonSize}
      buttonTheme={buttonTheme}
      onClick={handler}
    >
      {children}
    </ModalButton>
  ) : (
    <BaseButtonStyle
      buttonSize={buttonSize}
      buttonTheme={buttonTheme}
      disabled={disabled}
      onClick={handler}
      isArrow={isArrow}
    >
      {children}
      <NextArrowStyle isArrow={isArrow}>
        <NextArrow
          fill={
            buttonTheme === ButtonTheme.GREEN
              ? "#FFFFFF"
              : buttonTheme === ButtonTheme.GRAY
              ? "#A0A0A0"
              : "#7BAB6E"
          }
        />
      </NextArrowStyle>
    </BaseButtonStyle>
  );
};

export default Button;
