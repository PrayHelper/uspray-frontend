import { CheckboxStyle, CheckboxWrapper } from "./style";

const GreenCheckbox = ({ id, checked, handler }) => {
  return (
    <CheckboxWrapper>
      <CheckboxStyle
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onClick={() => handler}
      ></CheckboxStyle>
    </CheckboxWrapper>
  );
};

export default GreenCheckbox;
