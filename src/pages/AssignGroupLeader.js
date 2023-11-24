import React from 'react';
import UserHeader from '../components/UserHeader';
import styled from 'styled-components';
import Button, {ButtonSize, ButtonTheme} from '../components/Button/Button';
import { useState } from 'react';
import Search from '../components/AssignGroupLeader/Search';
import SearchList from '../components/AssignGroupLeader/SearchList';
import BlackScreen from "../components/BlackScreen/BlackScreen";
import Modal from '../components/Modal/Modal';
import useToast from '../hooks/useToast';
import { ToastTheme } from '../components/Toast/Toast';

const AssignGroupLeader = () => {
  const [showModal, setShowModal] = useState(false);
  const [leader, setLeader] = useState("");
  const [searchName, setSearchName] = useState("");
  const { showToast } = useToast({});
  const data = ['김은혜', '권은혜', '박은혜', '이은혜', '허은혜', '허그레이스', '권은혜', '박은혜', '이은혜'];

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
            iconSrc={"images/ic_group_leader_modal.svg"}
            iconAlt={"icon_group_leader"}
            mainContent={"모임 리더를 맡기시겠습니까?"}
            subContent={"맡기신 후에는 기본 멤버로 변경됩니다."}
            btnContent={"변경하기"}
            btnContent2={"취소"}
            onClickBtn={() => {
              closeModal();
              showToast({
                message: "리더가 변경되었어요.",
                theme: ToastTheme.SUCCESS,
              });
            }}
            onClickBtn2={closeModal}
            modalTheme={0}
          />
        </>
      )}
      <UserHeader>모임 리더 맡기기</UserHeader>
      <ContentWrapper>
        <div style={{display: "flex", flexDirection: "column", height: '100%'}}>
          <Search
            topText={"\"모임 리더 맡기기\"를 누르시면 모임리더 권한이 모두 위임되며, 나는 멤버로 변경됩니다."}
            setSearchName={setSearchName}
          />
          <SearchList data={data} searchName={searchName} leader={leader} setLeader={setLeader}/>
          <BottomButtonWrapper>
            <Button
              disabled={leader === ""}
              buttonSize={ButtonSize.LARGE}
              buttonTheme={leader ? ButtonTheme.GREEN : ButtonTheme.GRAY}
              isArrow={true}
              handler={() => {
                setShowModal(true);
              }}
            >
              모임 리더 맡기기
            </Button>
          </BottomButtonWrapper>
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
  width: 100%;
  gap: 24px;
  margin-top: 24px;
  flex: 1;
  overflow: hidden;
`

const BottomButtonWrapper = styled.div`
  position: absolute;
  bottom: 40px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`

export default AssignGroupLeader;