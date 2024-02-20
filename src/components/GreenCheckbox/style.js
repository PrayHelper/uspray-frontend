import styled from "styled-components";
import IcWhiteCheck from "../../images/ic_white_check.svg";

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxStyle = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #7bab6e;
  border-radius: 3px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${IcWhiteCheck});
  background-size: 0px 0px;
  background-repeat: no-repeat;
  background-position: 50%;
  margin: 4px;

  &:checked {
    transition: all 0.2s;
    border-color: transparent;
    background-size: 13.31px 9.07px;
    background-color: #7bab6e;
  }
`;
