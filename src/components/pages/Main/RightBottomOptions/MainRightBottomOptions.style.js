import styled from "styled-components";

const S = {
  OptionItem: styled.img`
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
    position: fixed;
    bottom: ${(props) =>
      props.isVisible ? `calc(80px + ${props.movingDistance}px)` : "80px"};
    right: 20px;
    transition: all 0.2s ease;
    filter: ${(props) =>
      props.isVisible ? "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3))" : "none"};
  `,
};

export default S;
