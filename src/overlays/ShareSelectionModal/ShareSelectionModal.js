import { atom, useAtom } from "jotai";
import styled from "styled-components";
import useToast from "../../hooks/useToast";
import { ToastTheme } from "../../components/Toast/Toast";
import useMobileShareMode from "../../hooks/useMobileShareMode";
import useCheckMobile from "../../hooks/useCheckMobile";

const isOpenedAtom = atom(false);
const isSelectedMapAtom = atom({});

const WEB_ORIGIN = process.env.REACT_APP_WEB_ORIGIN;

export const useShareSelection = () => {
  const [isOpened, setIsOpened] = useAtom(isOpenedAtom);
  const [isSelectedMap, setIsSelectedMap] = useAtom(isSelectedMapAtom);

  const { shareLink } = useMobileShareMode();
  const { isMobile } = useCheckMobile();

  const selectedLength = Object.values(isSelectedMap).filter(Boolean).length;

  const open = () => setIsOpened(true);

  const close = () => {
    setIsSelectedMap({});
    setIsOpened(false);
  };

  const toggleById = (id) => {
    setIsSelectedMap(({ [id]: prev, ...rest }) => ({
      [id]: !prev,
      ...rest,
    }));
  };

  const { showToast } = useToast({});

  const shareHandler = () => {
    if (selectedLength === 0) return;

    const checkedIdListString = Object.keys(isSelectedMap)
      .filter((id) => isSelectedMap[id])
      .join(",");
    const encodedIdListString = window.btoa(checkedIdListString);

    if (isMobile()) {
      shareLink({
        title: "Web_invite",
        url: `${WEB_ORIGIN}/main?share=` + encodedIdListString,
      });
    } else {
      showToast({
        message: "공유하기가 지원되지 않는 환경 입니다.",
        theme: ToastTheme.ERROR,
      });
    }

    close();
    console.log({ encodedIdListString });
  };

  return {
    isOpened,
    controlledModalProps: {
      isOpened,
      cancelHandler: close,
      shareHandler,
      selectedLength,
    },
    toggleById,
    isSelectedMap,
    open,
    close,
  };
};

const ShareSelectionModal = ({
  onClickBackground,
  isOpened,
  cancelHandler,
  shareHandler,
  selectedLength,
}) => {
  return (
    <>
      <S.BlackBg isOpened={isOpened} onClick={onClickBackground} />
      <S.BottomShareWrapper isOpened={isOpened}>
        <S.ShareNumberText>{selectedLength + "개 선택"}</S.ShareNumberText>
        <S.ShareButtonContainer>
          <S.ShareButtonWrapper
            disabled={true}
            color={"white"}
            onClick={cancelHandler}
          >
            취소하기
            <S.ShareButtonImage src="images/ic_share_cancel.svg" />
          </S.ShareButtonWrapper>
          <S.ShareButtonWrapper
            disabled={selectedLength === 0}
            color={"green"}
            onClick={shareHandler}
          >
            공유하기
            <S.ShareButtonImage src="images/ic_share_move.svg" />
          </S.ShareButtonWrapper>
        </S.ShareButtonContainer>
      </S.BottomShareWrapper>
    </>
  );
};

export default ShareSelectionModal;

const S = {
  BlackBg: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;

    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.7);

    opacity: ${({ isOpened }) => (isOpened ? 1 : 0)};
    pointer-events: ${({ isOpened }) => (isOpened ? "auto" : "none")};
    transition: all 0.2s ease-in-out;
    z-index: 100;
  `,
  BottomShareWrapper: styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100vh;
    width: 100vw;

    height: 128px;
    border: none;
    background-color: white;
    border-radius: 24px 24px 0px 0px;
    z-index: 10000;
    box-sizing: border-box;
    transition: all 0.3s ease-in-out;
    opacity: ${({ isOpened }) => (isOpened ? 1 : 0)};
    visibility: ${({ isOpened }) => (isOpened ? "visible" : "hidden")};
    transform: ${({ isOpened }) =>
      isOpened ? "translateY(0%)" : "translateY(100%)"};
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
    border: ${({ color }) =>
      color === "white" ? "1px solid var(--color-dark-green)" : "none"};
    background-color: ${({ color, disabled }) =>
      color === "white"
        ? "var(--color-white)"
        : disabled
        ? "var(--color-light-green)"
        : "var(--color-dark-green)"};
    color: ${({ color }) =>
      color === "white" ? "var(--color-dark-green)" : "var(--color-white)"};
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
};
