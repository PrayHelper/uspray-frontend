import styled from "styled-components";

const PrayDetailModal = ({
  showSubModal,
  currentData,
  onClickSubModal,
  onClickExitModal,
}) => {
  return (
    <ModalWrapper showSubModal={showSubModal}>
      <ModalHeader>
        <ModalTitleWrapper>
          <ModalTitle>
            <ModalTarget>{currentData.target}</ModalTarget>의 기도제목
          </ModalTitle>
          <ModalDate>
            {currentData?.created_at?.split(" ")[0].replace(/-/g, ".")} ~{" "}
            {currentData.deadline.replace(/-/g, ".")}, {currentData.pray_cnt}회
            기도
          </ModalDate>
        </ModalTitleWrapper>
      </ModalHeader>
      <ModalContent>{currentData.title}</ModalContent>
      <ModalWriter>
        {currentData.writer} {currentData?.origin_created_at?.split(" ")[0]}{" "}
        작성
      </ModalWriter>
      <ModalButtonWrapper>
        <ModalButton1 showSubModal={showSubModal} onClick={onClickSubModal}>
          또 기도하기
        </ModalButton1>
        <ModalButton2 onClick={onClickExitModal}>닫기</ModalButton2>
      </ModalButtonWrapper>
    </ModalWrapper>
  );
};

export default PrayDetailModal;

const ModalWrapper = styled.div`
  position: fixed;
  /* top: ${(props) => (props.showSubModal ? `40%` : `50%`)}; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw - 48px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-white);
  /* gap: 8px; */
  border-radius: 16px;
  z-index: 300;
  transition: all 0.3s ease-in-out;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 28px 0px 8px 28px;
`;

const ModalTitleWrapper = styled.div``;

const ModalTitle = styled.div`
  color: var(--color-dark-grey);
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 1px;
`;

const ModalTarget = styled.span`
  color: var(--color-dark-green);
  font-size: 20px;
`;

const ModalDate = styled.div`
  color: var(--color-dark-green);
  font-size: 12px;
`;

const ModalContent = styled.div`
  padding: 0px 28px 0px 28px;
  font-size: 16px;
  color: var(--color-dark-grey);
  word-break: keep-all;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ModalWriter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 12px 20px 11px 0px;
  font-size: 12px;
  color: var(--color-grey);
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  padding: 0px 16px 20px;
`;

const ModalButton1 = styled.button`
  width: 100%;
  background-color: var(
    ${(props) =>
      props.showSubModal ? "--color-light-green" : "--color-dark-green"}
  );
  border: none;
  border-radius: 16px;
  padding: 16px 0;
  color: var(
    ${(props) => (props.showSubModal ? "--color-dark-green" : "--color-white")}
  );
  font-size: 18px;
  cursor: pointer;
`;

const ModalButton2 = styled.button`
  width: 100%;
  background-color: var(--color-white);
  border-style: none;
  border-radius: 16px;
  border: ${(props) => (props.showSubModal ? "none" : "1px solid #7bab6e")};
  // border: 1px solid var(--color-dark-green);
  padding: 16px 0;
  color: var(--color-dark-green);
  font-size: 18px;
  cursor: pointer;
  &:active {
    transition: all 0.2s ease-in-out;
    filter: ${(props) =>
      props.disabled ? "brightness(1)" : "brightness(0.9)"};
    scale: ${(props) => (props.disabled ? "1" : "0.98")};
  }
`;
