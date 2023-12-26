import styled from "styled-components";

export const BlackScreenStyle = styled.div`
  transition: all 0.3s ease-in-out;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 200;
  opacity: ${(props) => (props.isModalOn ? "1" : "0")};
  pointer-events: ${(props) => (props.isModalOn ? "auto" : "none")};
`;
