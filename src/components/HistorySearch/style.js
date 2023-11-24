import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const SearchWrapper = styled.div`
  display: flex;
  background-color: var(--color-dark-green);
  width: 100%;
  flex-direction: column;
  border-radius: 0px 0px 16px 16px;
  transition: all 0.3s;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  color: var(--color-white);
  margin: 16px;
`;

export const MainWrapper = styled.div`
  margin: 16px;
`;

export const SearchBarWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  background-color: var(--color-white);
  border-radius: 8px;
  padding: 8px;
`;

export const SearchBar = styled.input`
  flex: 1; /* 입력 필드를 확장하여 나머지 공간을 차지하도록 함 */
  border: none;
  outline: none;
  font-size: 16px;
  ::placeholder {
    color: var(--color-grey-50);
  }
  color: var(--color-grey);
`;

export const SearchBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const StartDatePickerContainer = styled.div`
  position: absolute;
  top: calc(100% + 16px);
  left: 0;
  z-index: 400;
`;

export const EndDatePickerContainer = styled.div`
  position: absolute;
  top: calc(100% + 16px);
  right: 0;
  z-index: 400;
`;

export const DateWrapper = styled.div`
  z-index: 400;
  position: relative;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  animation: ${(props) =>
    props.isClickedCalender
      ? css`
          ${fadeIn} 0.5s ease
        `
      : `none`};
`;

export const DateBox = styled.div`
  border-radius: 8px;
  color: ${(props) =>
    props.isClicked ? `var(--color-green)` : `var(--color-grey-50)`};
  background-color: var(--color-white);
  padding: 8px 36px;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const NoDataContent = styled.div`
  font-weight: 500;
  font-size: 24px;
  margin-top: 16px;
  color: var(--color-secondary-grey);
`;
