import styled, { keyframes, css } from "styled-components";

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

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0%);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;

export const OverlayWrapper = styled.div`
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
  animation: ${(props) =>
    props.isOverlayOn
      ? css`${fadeIn} 0.3s ease-in-out`
      : css`${fadeOut} 0.3s ease-in-out forwards`};
`;
