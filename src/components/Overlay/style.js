import styled from "styled-components";

export const OverlayWrapper = styled.div`
  transition: all 0.3s ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1000;
  opacity: ${(props) => (props.isOverlayOn ? "1" : "0")};
  pointer-events: ${(props) => (props.isOverlayOn ? "auto" : "none")};
  overflow-y: auto;
`;
