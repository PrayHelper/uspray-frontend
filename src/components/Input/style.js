import styled from "styled-components";

export const WrapperStyle = styled.div`
  position: relative;
  border: ${(props) => (props.isFocused ? "2px" : "1px")} solid
    ${(props) => (props.isError ? "#FF6B6B" : "#7BAB6E")};
  border-radius: 15px;
  margin: ${(props) => (props.isFocused ? "-1px" : "0px")};
  background-color: var(--color-white);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &:hover {
    border: 2px solid ${(props) => (props.isError ? "#FF6B6B" : "#7BAB6E")};
    margin: -1px;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-text-fill-color: #75bd62;
    -webkit-box-shadow: 0 0 0px 40rem #fff inset;
  }
`;

export const LabelStyle = styled.span`
  position: absolute;
  top: ${(props) => (props.isFocused ? "0px" : "50%")};
  left: 9px;
  transform: translateY(-50%);

  font-size: ${(props) => (props.isFocused ? "12px" : "16px")};
  color: ${(props) => (props.isError ? "#FF6B6B" : "#7BAB6E")};
  padding: 0px 5px;
  /* z-index: ${(props) => (props.isFocused ? "1" : "0")}; */

  background-color: ${(props) => (props.isFocused ? "#FFFFFFFF" : "#FFFFFFFF")};
  transition: all 0.2s;
  border-radius: 8px;
`;

export const InputStyle = styled.input`
  width: 100%;
  padding: 16.5px 14px;
  border: none;
  border-radius: 15px;

  background: transparent;
  &:focus {
    outline: none;
  }
  font-size: 16px;
  color: ${(props) => (props.isError ? "#FF6B6B" : "#7BAB6E")};
`;

export const DescriptionStyle = styled.div`
  position: absolute;
  right: 12px;
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  color: ${(props) => (props.isError ? "#FF6B6B" : "#7BAB6E")};
`;
