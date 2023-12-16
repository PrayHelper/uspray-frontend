import React from 'react';
import UserHeader from '../../UserHeader';
import styled from 'styled-components';
import Button, {ButtonSize, ButtonTheme} from '../../Button/Button';
import { useState } from 'react';
import Search from './Search';
import SearchList from './SearchList';
import BlackScreen from "../../BlackScreen/BlackScreen";
import Modal from '../../Modal/Modal';
import useToast from '../../../hooks/useToast';
import { ToastTheme } from '../../Toast/Toast';
import { useSearchGroupMember } from '../../../hooks/useSearchGroupMember';
import { useGroupSetting } from '../../../hooks/useGroupSetting';

const KickMember = ({groupId, setCurrentPage, setShowGroupSetting}) => {
  const [showModal, setShowModal] = useState(false);
  const [memberId, setMemberId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const { showToast } = useToast({});
  const { memberList } = useSearchGroupMember(groupId, searchName);
  const { kickGroupMember } = useGroupSetting();

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
            iconSrc={"images/ic_group_remove.svg"}
            iconAlt={"icon_group_remove"}
            mainContent={"모임에서 내보내겠습니까?"}
            subContent={"내보낸 후에는 모임에 참여할 수 없습니다."}
            btnContent={"내보내기"}
            btnContent2={"취소"}
            onClickBtn={() => {
              closeModal();
              kickGroupMember(
                {memberId, groupId},
                {
                  onSuccess: () => {
                    setCurrentPage('');
                    setShowGroupSetting(false);
                    showToast({
                      message: "멤버가 내보내졌어요.",
                      theme: ToastTheme.SUCCESS,
                    });
                  }
                }
              );
            }}
            onClickBtn2={closeModal}
            modalTheme={2}
          />
        </>
      )}
      <UserHeader back={() => setCurrentPage('')}>멤버 내보내기</UserHeader>
      <ContentWrapper>
        <div style={{display: "flex", flexDirection: "column", height: '100%'}}>
          <Search
            topText={"\"멤버 내보내기\"를 누르시면?"}
            setSearchName={setSearchName}
          />
          <SearchList memberList={memberList} memberId={memberId} setMemberId={setMemberId}/>
          <BottomButtonWrapper>
            <Button
              disabled={memberId === null}
              buttonSize={ButtonSize.LARGE}
              buttonTheme={memberId ? ButtonTheme.GREEN : ButtonTheme.GRAY}
              isArrow={true}
              handler={() => {
                setShowModal(true);
              }}
            >
              멤버 내보내기
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

export default KickMember;