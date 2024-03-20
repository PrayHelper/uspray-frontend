import styled from "styled-components";

const S = {
  Container: styled.div`
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
  CategoryInput: styled.input`
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
};

export default S;
