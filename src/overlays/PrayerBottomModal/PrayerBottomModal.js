import { createPortal } from "react-dom";
import styled from "styled-components";

const COLOR_MAP = {
  green: "#27CD2F",
  blue: "#408CFF",
  red: "#FF4F4F",
};

const PrayerBottomModal = ({
  isShow,
  closeModal,
  onClickComplete,
  onClickModify,
  onClickDelete,
}) => {
  return createPortal(
    <>
      <S.BlackBg id={"blackbg"} isShow={isShow} onClick={closeModal} />
      <S.ModalOuter isShow={isShow}>
        <S.ModalInner>
          <S.BottomButtonWrapper onClick={onClickComplete}>
            <img src={"/images/check_img.svg"} alt="" />
            <S.BottomButtonText color={"green"}>완료하기</S.BottomButtonText>
          </S.BottomButtonWrapper>
          <S.BottomButtonWrapper onClick={onClickModify}>
            <img src={"/images/modify_img.svg"} alt="" />
            <S.BottomButtonText color={"blue"}>수정하기</S.BottomButtonText>
          </S.BottomButtonWrapper>
          <S.BottomButtonWrapper onClick={onClickDelete}>
            <img src={"/images/delete_img.svg"} alt="" />
            <S.BottomButtonText color={"red"}>삭제하기</S.BottomButtonText>
          </S.BottomButtonWrapper>
        </S.ModalInner>
      </S.ModalOuter>
    </>,
    document.getElementById("prayer-bottom-modal")
  );
};

export default PrayerBottomModal;

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
  ModalOuter: styled.div`
    position: fixed;
    bottom: 0;
    left: 0;

    width: 100%;
    border-radius: 24px 24px 0px 0px;
    background: #fff;

    transform: ${({ isShow }) =>
      isShow ? "translateY(0%)" : "translateY(100%)"};
    transition: all 0.2s ease-in-out;
    z-index: 204;
  `,
  ModalInner: styled.div`
    display: flex;
    justify-content: center;
    gap: 18px;

    padding: 37px 24px;
  `,
  BottomButtonWrapper: styled.button`
    flex-grow: 1;
    padding: 12px 18px;
    border-radius: 16px;
    background: #f8f8f8;
    border: none;
  `,
  BottomButtonText: styled.div`
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: ${({ color }) => COLOR_MAP[color]};
  `,
};
