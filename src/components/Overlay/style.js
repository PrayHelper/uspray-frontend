import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0%);
  }
`;

export const OverlayWrapper = styled.div`
  transition: all 0.3s ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 104;
  opacity: ${(props) => (props.isOverlayOn ? "1" : "0")};
  pointer-events: ${(props) => (props.isOverlayOn ? "auto" : "none")};
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  animation: ${fadeIn} 0.3s ease-in-out;
`;
