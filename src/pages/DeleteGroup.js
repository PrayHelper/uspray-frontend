import React from 'react';
import UserHeader from '../components/UserHeader';
import styled from 'styled-components';
import { useState } from 'react';
import BlackScreen from "../components/BlackScreen/BlackScreen";
import Modal from '../components/Modal/Modal';
import useToast from '../hooks/useToast';
import { ToastTheme } from '../components/Toast/Toast';
import { useNavigate } from 'react-router-dom';

const DeleteGroup = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
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
            mainContent={"모임을 삭제하시겠습니까?"}
            subContent={"삭제된 모임은 복구할 수 없습니다."}
            btnContent={"삭제하기"}
            btnContent2={"취소"}
            onClickBtn={() => {
              closeModal();
              showToast({
                message: "모임이 삭제되었어요.",
                theme: ToastTheme.SUCCESS,
              });
              navigate('/group');
            }}
            onClickBtn2={closeModal}
            modalTheme={2}
          />
        </>
      )}
      <UserHeader>모임 삭제하기</UserHeader>
      <ContentWrapper>
        <div style={{display: "flex", flexDirection: "column", width: "calc(100% - 32px)", gap: "12px"}}>
          <NoticeDiv>
            모임 삭제 전 주의사항
          </NoticeDiv>
          <div style={{fontSize: "14px", color: "var(--color-grey)"}}>- 삭제된 모임은 복구할 수 없습니다.</div>
        </div>
        <ContinueBtn onClick={() => setShowModal(true)}>계속하기</ContinueBtn>
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
  justify-content: space-between;
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

const ContinueBtn = styled.button`
  // remove default button style
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  cursor: pointer;

  width: 100%;
  font-size: 16px;
  font-weight: 500;
  line-height: 23px;
  text-align: center;
  padding: 20px;
  background-color: var(--color-dark-green);
  color: #FFFFFF;
`

export default DeleteGroup;