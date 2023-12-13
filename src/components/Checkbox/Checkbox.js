import {
  CheckboxStyle,
  CheckboxWrapper,
  StyledLabel,
  StyledLinkLabel,
} from "./style";

export const CheckboxTheme = {
  GRAY: 1,
  WHITE: 2,
};

Object.freeze(CheckboxTheme);

const Checkbox = ({
  id,
  label,
  linklabel,
  checked,
  handler,
  theme,
  size,
  showInformation,
}) => {
  if (!theme) {
    theme = CheckboxTheme.GRAY;
  }
  if (!size) {
    size = "14px";
  }

  return (
    <CheckboxWrapper>
      <CheckboxStyle
        theme={theme}
        type="checkbox"
        size={size}
        id={id}
        name={id}
        checked={checked}
        onChange={handler}
      ></CheckboxStyle>
      <StyledLinkLabel theme={theme} onClick={() => showInformation()}>
        {linklabel}
      </StyledLinkLabel>
      <StyledLabel size={size} theme={theme} htmlFor={id}>
        {label}
      </StyledLabel>
    </CheckboxWrapper>
  );
};

export default Checkbox;
