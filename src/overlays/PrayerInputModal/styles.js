import { TextareaAutosize } from "@mui/material";
import styled from "styled-components";

const S = {
  BlackBg: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;

    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.7);

    opacity: ${({ isShow }) => (isShow ? 1 : 0)};
    pointer-events: ${({ isShow }) => (isShow ? "auto" : "none")};
    transition: all 0.2s ease-in-out;
    z-index: 201;
  `,
  Outer: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;

    z-index: 202;

    display: flex;
    flex-direction: column;

    opacity: ${({ isShow }) => (isShow ? 1 : 0)};
    pointer-events: none;
  `,
  Inner: styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 16px;
  `,
  TopContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    pointer-events: ${({ isShow }) => (isShow ? "auto" : "none")};
  `,
  TextAndDateContainer: styled.div`
    border-radius: 16px;
    padding: 16px 16px;
    background-color: var(--color-white);
  `,
  BottomContainer: styled.div`
    display: flex;
    flex-direction: column;
    pointer-events: ${({ isShow }) => (isShow ? "auto" : "none")};
  `,
  CategoryListContainer: styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    overflow-x: auto;

    // Chrome, Edge 등
    &::-webkit-scrollbar {
      display: none;
    }
    // Firefox
    scrollbar-width: none;
    // IE, Edge
    -ms-overflow-style: none;
  `,
  CategoryItemContainer: styled.div`
    background-color: ${({ selected, color }) =>
      selected ? color : "#EEEEEE"};
    color: ${({ selected, color }) =>
      selected ? (color === "#D0E8CB" ? "#A0A0A0" : "#FFFFFF") : "#CECECE"};
    border-radius: 24px;
    padding: 16px;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    transition: all 0.2s ease-in-out;
  `,
  TextInput: styled(TextareaAutosize)`
    width: 100%;
    margin-bottom: 12px;
    border: none;
    font-size: 16px;
    color: #606060;
    outline: none;
    border-bottom: 1px solid var(--color-white-green);
    letter-spacing: -0.04em;
    ::placeholder {
      color: ${({ placeholderColor }) =>
        placeholderColor ?? "#b7ceb0"}; // 원하는 색상으로 변경
    }
    :focus {
      border-bottom: 1px solid var(--color-dark-green);
    }
    font-weight: 400;
    :disabled {
      background-color: var(--color-white);
      color: var(--color-dark-grey-30);
    }
    resize: none;
    letter-spacing: -0.04em;
  `,
  SubTextStyle: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: var(--color-green);
    margin-bottom: 16px;
  `,
  SaveCountText: styled.div`
    font-size: 16px;
    color: var(--color-green);
    padding: 0px 2px 4px;
    height: 23px;
    border-bottom: 1px solid var(--color-white-green);
    margin-bottom: 12px;
  `,
};

export default S;
