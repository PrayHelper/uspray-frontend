import React from 'react';
import UserHeader from '../components/UserHeader';
import styled from 'styled-components';
import { useState } from 'react';
import BlackScreen from "../components/BlackScreen/BlackScreen";
import Modal from '../components/Modal/Modal';
import useToast from '../hooks/useToast';
import { ToastTheme } from '../components/Toast/Toast';

const LeaveGroup = () => {
  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast({});

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <Wrapper>
      {showModal && (
        <>
          <BlackScreen isModalOn={showModal} onClick={closeModal} />
          <Modal
            isModalOn={showModal}
            iconSrc={"images/ic_group_delete.svg"}
            iconAlt={"icon_group_delete"}
            mainContent={"모임을 나가시겠습니까?"}
            subContent={"업로드 된 기도제목은 삭제되지 않습니다."}
            btnContent={"나가기"}
            btnContent2={"취소"}
            onClickBtn={() => {
              closeModal();
              showToast({
                message: "모임에서 나갔어요.",
                theme: ToastTheme.SUCCESS,
              });
            }}
            onClickBtn2={closeModal}
            modalTheme={2}
          />
        </>
      )}
      <UserHeader>모임 나가기</UserHeader>
      <ContentWrapper>
        <div style={{display: "flex", flexDirection: "column", width: "calc(100% - 32px)", gap: "12px"}}>
          <NoticeDiv>
            모임에서 나가기 전 주의사항
          </NoticeDiv>
          <div style={{fontSize: "14px", color: "var(--color-grey)"}}>- 업로드 된 기도제목은 삭제되지 않습니다.</div>

        </div>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 24px;
  margin-top: 12px;
  flex: 1;
  overflow: hidden;
`

const NoticeDiv = styled.div`
  color: var(--color-grey);
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  padding: 12px 0px;
  border-bottom: 1px solid var(--color-light-grey);
`

export default LeaveGroup;