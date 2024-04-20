import { createPortal } from "react-dom";
import Modal from "../../components/Modal/Modal";
import styled from "styled-components";

const PrayerDeleteModal = ({ isShow, deleteHandler, cancelHandler }) => {
  return createPortal(
    <>
      <S.BlackBg isShow={isShow} />
      <Modal
        isModalOn={isShow}
        iconSrc={"images/ic_group_pray_delete.svg"}
        iconAlt={"group_pray_delete"}
        mainContent={"정말 삭제하시겠습니까?"}
        subContent={"해당 모임의 기도 목록에서 지워집니다."}
        btnContent={"삭제"}
        btnContent2={"취소"}
        onClickBtn={deleteHandler}
        onClickBtn2={cancelHandler}
        modalTheme={2}
      />
    </>,
    document.getElementById("prayer-delete-modal")
  );
};

export default PrayerDeleteModal;

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
};
