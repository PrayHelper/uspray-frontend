import styled from "styled-components";

const S = {
  // 전체 흰색 박스(카테고리 목록 ~ 기도제목 목록)
  MainContentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 139px);
    width: 100%;
    position: fixed;
    top: 139px;
    background-color: var(--color-white);
    border-radius: 32px 32px 0px 0px;
    box-sizing: border-box;
    z-index: ${(props) => (props.shareMode ? 200 : "auto")};
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
  `,
  // 카테고리 덮개
  TopWrapper: styled.div`
    display: flex;
    padding: 24px 16px 16px;
    position: sticky;
    top: 0;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 24px;
    z-index: ${(props) => (props.shareMode ? 201 : 50)};
    backdrop-filter: blur(12px);
    border: ${(props) =>
      props.shareMode ? "1px solid rgba(0, 0, 0, 0.1)" : "none"};
    box-shadow: ${(props) =>
      props.shareMode ? "0px 0px 4px rgba(0, 0, 0, 0.1)" : "none"};
  `,
  // 카테고리 박스
  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 8px 16px 124px;
  `,
  // 기도제목 눌렀을 때 아래에서 나오는 옵션 박스
  BottomSetWrapper: styled.div`
    display: flex;
    position: fixed;
    box-sizing: border-box;
    justify-content: center;
    gap: 18px;
    width: 100%;
    padding: 37px 24px;
    transition: all 0.3s ease-in-out;
    bottom: ${(props) =>
      props.selectedPrayInfo === null || props.showModal ? "-100%" : "0px"};
    z-index: 202;
    border-radius: 24px 24px 0px 0px;
    background: #fff;
  `,
  BottomButtonWrapper: styled.button`
    flex-grow: 1;
    padding: 12px 18px;
    border-radius: 16px;
    background: #f8f8f8;
    border: none;
  `,
  // BottomSetWrapper의 Text
  BottomButtonText: styled.div`
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: ${(props) =>
      props.color === "green"
        ? "#27CD2F"
        : props.color === "blue"
        ? "#408CFF"
        : "#FF4F4F"};
  `,
  // ShareMode일 때 아래에서 나오는 옵션 박스
  BottomShareWrapper: styled.div`
    width: 100%;
    position: fixed;
    top: 1;
    bottom: 0;
    height: 128px;
    border: none;
    background-color: white;
    border-radius: 24px 24px 0px 0px;
    z-index: 202;
    box-sizing: border-box;
    transition: all 0.3s ease-in-out;
    opacity: ${(props) => (props.shareMode ? 1 : 0)};
    visibility: ${(props) => (props.shareMode ? "visible" : "hidden")};
    transform: ${(props) =>
      props.shareMode ? "translateY(0%)" : "translateY(100%)"};
    border: 1px solid rgba(0, 0, 0, 0.1);
  `,
  // BottomShareWrapper의 버튼 컨테이너
  ShareButtonContainer: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 75px;
    border: none;
    gap: 14px;
    margin-top: 8px;
    padding: 0px 24px 12px 24px;
    box-sizing: border-box;
  `,
  ShareButtonWrapper: styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 12px;
    border: ${(props) =>
      props.color === "white" ? "1px solid var(--color-dark-green)" : "none"};
    background-color: ${(props) =>
      props.color === "white"
        ? "var(--color-white)"
        : props.disabled
        ? "var(--color-light-green)"
        : "var(--color-dark-green)"};
    color: ${(props) =>
      props.color === "white"
        ? "var(--color-dark-green)"
        : "var(--color-white)"};
    border-radius: 16px;
    font-weight: 700;
    font-size: 16px;
  `,
  // BottomShareWrapper의 버튼의 이미지
  ShareButtonImage: styled.img`
    height: 16px;
    width: 16px;
    margin-left: 20px;
  `,
  // BottomShareWrapper의 글자(ㅇ개 선택)
  ShareNumberText: styled.div`
    height: 17px;
    display: flex;
    font-weight: 700;
    font-size: 12px;
    color: var(--color-dark-green);
    margin-right: 26px;
    margin-top: 12px;
    flex-direction: row-reverse;
  `,
  // BottomSetWrapper와 BottomShareWrapper의 Background
  BlackBackground: styled.div`
    transition: all 0.3s ease-in-out;
    background-color: rgba(0, 0, 0, 0.7);
    display: ${(props) => (!props.showModal ? "flex" : "none")};
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: ${(props) =>
      props.selectedPrayInfo !== null ? 100 : props.shareMode ? 198 : 0};
    opacity: ${(props) =>
      props.selectedPrayInfo !== null || props.shareMode ? 1 : 0};
    backdrop-filter: blur(4px);
    pointer-events: ${(props) =>
      props.selectedPrayInfo !== null || props.shareMode ? "auto" : "none"};
  `,
};

export default S;
