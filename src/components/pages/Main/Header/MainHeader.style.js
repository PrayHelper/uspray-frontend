import styled from "styled-components";

const S = {
  HeaderRootContainer: styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 16px;
    gap: 16px;
  `,
  TabList: styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
  `,
  TabItem: styled.div`
    font-size: 24px;
    color: ${({ active }) => (active ? "#FFFFFF" : "#FFFFFF80")};
    cursor: pointer;
    border-bottom: ${({ active }) => (active ? "2px solid #FFFFFF" : "none")};
  `,
  BottomAreaWrapper: styled.div`
    display: flex;
  `,
  MoveToLockerButton: styled.div`
    width: 100%;
    padding: 14px 16px;
    background-color: #ffffff40;
    color: #ffffff;
    border-radius: 16px;
    position: relative;

    ::after {
      content: "";
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;
      background-image: url("/images/ic_right_arrow.svg");
      background-size: contain;
    }

    &:active {
      transition: all 0.2s ease-in-out;
      filter: ${({ disabled }) =>
        disabled ? "brightness(1)" : "brightness(0.9)"};
      scale: ${({ disabled }) => (disabled ? "1" : "0.98")};
    }
  `,
  Input: styled.input`
    width: 100%;
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
};

export default S;
