import styled from "styled-components";

export const ToggleButtonStyle = styled.button`
  flex: 1 0;
  height: 56px;
  border: 1px solid #7bab6e;
  padding: 16.5px 0;
  cursor: pointer;
  font-size: 16px;
  background-color: ${(props) => (props.isClicked ? "#7BAB6E" : "white")};
  color: ${(props) => (props.isClicked ? "white" : "#7BAB6E")};
  &:first-child {
    border-radius: 16px 0 0 16px;
    border-right: 0;
  }
  &:last-child {
    border-radius: 0 16px 16px 0;
  }

  transition: all 0.2s ease-in-out;
`;
