import { createPortal } from "react-dom";
import styled from "styled-components";

const PrayerBottomModal = ({
  isShow,
  closeModal,
  onClickComplete,
  onClickModify,
  onClickDelete,
}) =>
  isShow &&
  createPortal(
    <S.BlackBg onClick={closeModal}>
      <S.ModalContainer>
        <S.BottomButtonWrapper>
          <img src={"/images/delete_img.svg"} alt="" />
          <S.BottomButtonText color={"green"} onClick={onClickComplete}>
            완료하기
          </S.BottomButtonText>
        </S.BottomButtonWrapper>
        <S.BottomButtonWrapper>
          <img src={"/images/delete_img.svg"} alt="" />
          <S.BottomButtonText color={"blue"} onClick={onClickModify}>
            수정하기
          </S.BottomButtonText>
        </S.BottomButtonWrapper>
        <S.BottomButtonWrapper>
          <img src={"/images/delete_img.svg"} alt="" />
          <S.BottomButtonText color={"red"} onClick={onClickDelete}>
            삭제하기
          </S.BottomButtonText>
        </S.BottomButtonWrapper>
      </S.ModalContainer>
    </S.BlackBg>,
    document.getElementById("prayer-bottom-modal")
  );

export default PrayerBottomModal;

const S = {
  // 기도제목 눌렀을 때 아래에서 나오는 옵션 박스
  ModalContainer: styled.div`
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    gap: 18px;
    width: 100%;
    padding: 37px 24px;
    transition: all 0.3s ease-in-out;
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
  // ModalContainer의 Text
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
  BlackBg: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: red;
    transition: all 0.3s ease-in-out;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    /* pointer-events: ${(props) =>
      props.selectedPray !== null || props.shareMode ? "auto" : "none"}; */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 100;
  `,
};
