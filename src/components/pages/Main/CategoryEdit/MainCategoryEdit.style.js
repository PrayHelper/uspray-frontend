import styled from "styled-components";

const S = {
  RootContainer: styled.div`
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    padding: 16px;
    box-sizing: border-box;
    backdrop-filter: blur(8px);
  `,
  Input: styled.input`
    width: calc(100%-16px);
    height: 51px;
    border-radius: 16px;
    padding: 0px 16px;
    ::placeholder {
      color: var(--color-secondary-green);
      font-weight: 400;
    }
    outline: none;
    border: 0;
    color: var(--color-green);
    font-weight: 400;
    letter-spacing: -0.64px;
    font-size: 16px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);
  `,
  FixedButtonContainer: styled.div`
    position: fixed;
    bottom: 64px;
    width: calc(100% - 32px);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  ColorPalette: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    margin-top: 8px;
  `,
  ColorDrop: styled.div`
    width: 32px;
    height: 32px;
    background-color: ${(props) => props.color};
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
    transform: rotate(45deg);

    ::after {
      content: "";
      position: absolute;
      top: 115%;
      left: 115%;
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      display: ${(props) =>
        props.color === props.selectedColor ? "block" : "none"};
    }
  `,
};

export default S;
