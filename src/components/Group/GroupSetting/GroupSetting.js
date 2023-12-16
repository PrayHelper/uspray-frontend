import React from 'react';
import styled from 'styled-components';
import Button from '../../Button';
import { ButtonSize, ButtonTheme } from '../../Button/Button';
import UserHeader from '../../UserHeader';
import { useState } from 'react';
import ChangeGroupName from './ChangeGroupName';
import ChangeGroupLeader from './ChangeGroupLeader';
import KickMember from './KickMember';
import DeleteGroup from './DeleteGroup';

const GroupSetting = ({group, setShowGroupSetting}) => {
  const [currentPage, setCurrentPage] = useState('');

  const renderPage = () => {
    switch (currentPage) {
      case 'changeGroupName':
        return (
          <ChangeGroupName
            name={group.name}
            groupId={group.id}
            setCurrentPage={setCurrentPage}
            setShowGroupSetting={setShowGroupSetting}
          />
        );
      case 'changeGroupLeader':
        return (
          <ChangeGroupLeader
            groupId={group.id}
            setCurrentPage={setCurrentPage}
            setShowGroupSetting={setShowGroupSetting}
          />
        );
      case 'kickMember':
        return (
          <KickMember
            groupId={group.id}
            setCurrentPage={setCurrentPage}
            setShowGroupSetting={setShowGroupSetting}
          />
        );
      case 'deleteGroup':
        return (
          <DeleteGroup
            groupId={group.id}
            setCurrentPage={setCurrentPage}
            setShowGroupSetting={setShowGroupSetting}
          />
        );
      default:
        return ;
    }
  };
  return (
    <Wrapper>
      {currentPage && <RenderPage>{renderPage()}</RenderPage>}
      <UserHeader back={() => setShowGroupSetting(prev => !prev)}>모임 설정하기</UserHeader>
      <ButtonWrapper>
        <div style={{padding: "0 16px", display: "flex", flexDirection: "column", gap: "24px",}}>
          <Button
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.GREEN}
            isArrow={true}
            handler={() => setCurrentPage('changeGroupName')}
          >
            모임 이름 변경하기
          </Button>
          <Button
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.GREEN}
            isArrow={true}
            handler={() => setCurrentPage('changeGroupLeader')}
          >
            모임 리더 맡기기
          </Button>
          <Button
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.WHITE}
            isArrow={true}
            handler={() => setCurrentPage('kickMember')}
          >
            멤버 내보내기
          </Button>
          <Button
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.WHITE}
            isArrow={true}
            handler={() => setCurrentPage('deleteGroup')}
          >
            모임 삭제하기
          </Button>
        </div>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  z-index: 101;
  transition: all 0.3s ease-in-out;
`

const RenderPage = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  z-index: 102;
  transition: all 0.3s ease-in-out;
`

const ButtonWrapper = styled.div`
  width: 100%;
  gap: 24px;
  margin-top: 24px;
`

export default GroupSetting;