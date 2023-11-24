import styled from "styled-components";

export const ButtonTheme = {
  FILLED: 0,
  OUTLINED: 1,
};

Object.freeze(ButtonTheme);

const ButtonV2 = ({buttonTheme, disabled, children}) => {
  if (!buttonTheme) {
    buttonTheme = ButtonTheme.FILLED;
  }
  return (
    <ButtonStyle buttonTheme={buttonTheme} disabled={disabled}>
      {children}
    </ButtonStyle>
  );
};

export default ButtonV2;

const ButtonStyle = styled.div`
  background: ${(props) =>
    props.disabled
      ? "linear-gradient(0deg, rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), #7BAB6E"
      : "var(--color-dark-green)"};
  filter: ${(props) =>
    props.disabled ? "drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.25))" : "none"};
  border-radius: 16px;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: var(--color-white);
  padding: 20px 0px;
  &:active {
    transition: all 0.2s ease-in-out;
    filter: ${(props) =>
      props.disabled ? "brightness(1)" : "brightness(0.9)"};
  }
`;
