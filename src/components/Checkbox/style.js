import styled from "styled-components";
import IcGrayCheck from "../../images/ic_gray_check.svg";
import IcGreenCheck from "../../images/ic_green_check.svg";
import { Link } from "react-router-dom";
import { CheckboxTheme } from "./Checkbox";

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  width: calc(100vw - 64px);
`;

export const CheckboxStyle = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid
    var(
      ${(props) =>
        props.theme === CheckboxTheme.GRAY
          ? "--color-secondary-grey"
          : "--color-white-green"}
    );
  border-radius: 3px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${(props) =>
    props.theme === CheckboxTheme.GRAY
      ? `url(${IcGrayCheck})`
      : `url(${IcGreenCheck})`};
  background-size: 0px 0px;
  background-repeat: no-repeat;
  background-position: 50%;
  flex-shrink: 0;
  margin: 0px 8px 0px 0px;

  &:checked {
    transition: all 0.2s;
    border-color: transparent;
    background-size: 10px 7px;
    background-color: var(
      ${(props) =>
        props.theme === CheckboxTheme.GRAY
          ? "--color-secondary-grey"
          : "--color-white-green"}
    );
  }
`;

export const StyledLinkLabel = styled(Link)`
  color: var(
    ${(props) =>
      props.theme === CheckboxTheme.GRAY
        ? "--color-grey"
        : "--color-white-green"}
  );
  font-size: 14px;
  text-decoration: underline;
`;

export const StyledLabel = styled.div`
  color: var(
    ${(props) =>
      props.theme === CheckboxTheme.GRAY
        ? "--color-grey"
        : "--color-white-green"}
  );
  font-size: ${(props) => props.size};
`;
