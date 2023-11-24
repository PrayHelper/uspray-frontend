import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { ButtonSize, ButtonTheme } from '../components/Button/Button';
import UserHeader from '../components/UserHeader';
import { useNavigate } from 'react-router-dom';

const GroupSettings = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <UserHeader>모임 설정하기</UserHeader>
      <ButtonWrapper>
        <div style={{padding: "0 16px", display: "flex", flexDirection: "column", gap: "24px",}}>
          <Button
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.GREEN}
            isArrow={true}
            handler={() => navigate('/changeGroupName')}
          >
            모임 이름 변경하기
          </Button>
          <Button
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.GREEN}
            isArrow={true}
            handler={() => navigate('/assignGroupLeader')}
          >
            모임 리더 맡기기
          </Button>
          <Button
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.WHITE}
            isArrow={true}
            handler={() => navigate('/removeMember')}
          >
            멤버 내보내기
          </Button>
          <Button
            buttonSize={ButtonSize.LARGE}
            buttonTheme={ButtonTheme.WHITE}
            isArrow={true}
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
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonWrapper = styled.div`
  width: 100%;
  gap: 24px;
  margin-top: 24px;
`

export default GroupSettings;