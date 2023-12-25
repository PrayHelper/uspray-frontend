import IcGreenCheck from "../../images/ic_green_check.svg";
import styled from "styled-components";

const ShareBotCheckBox = ({ id, label, checked, handler }) => {
  return (
    <CheckboxWrapper>
      <CheckboxStyle
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={handler}
      ></CheckboxStyle>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
    </CheckboxWrapper>
  );
};

export default ShareBotCheckBox;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
`;

const CheckboxStyle = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #ebf7e8;
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${IcGreenCheck});
  background-size: 0px 0px;
  background-repeat: no-repeat;
  background-position: 50%;

  &:checked {
    transition: all 0.2s;
    border-color: transparent;
    background-size: 13.31px 9.07px;
    background-color: #ebf7e8;
  }
`;

const StyledLabel = styled.div`
  color: #a0a0a0;
  font-size: 14px;
`;
