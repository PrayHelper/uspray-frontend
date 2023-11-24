import React from 'react';
import styled from 'styled-components';
import UserHeader from '../components/UserHeader';
import Input from '../components/Input/Input';
import { useState } from 'react';
import Button, {ButtonSize, ButtonTheme} from '../components/Button/Button';

const ChangeGroupName = () => {
  const [groupName, setGroupName] = useState("북동 1팀");
  const [invalidGroupName, setInvalidGroupName] = useState("");

  const groupNameCheck = (name) => {
    const groupNameRegEx = /^\s*\S.{0,14}\S\s*$/;
    return groupNameRegEx.test(name);
  };

  const groupNameChangeHandler = (e) => {
    setGroupName(e.target.value);
    if (!groupNameCheck(e.target.value)) {
      setInvalidGroupName("공백포함 15자 이내로 입력해주세요.");
      return;
    }
    setInvalidGroupName("");
  };

  return (
    <Wrapper>
      <UserHeader>모임 이름 변경</UserHeader>
      <ContentWrapper>
        <div style={{padding: "0 16px", display: "flex", flexDirection: "column", gap: "24px",}}>
          <Input
            label="모임 이름"
            value={groupName}
            onChangeHandler={groupNameChangeHandler}
            isError={!!invalidGroupName}
            description={invalidGroupName}
          />
          <BottomButtonWrapper>
            <Button
              disabled={groupName && !invalidGroupName}
              buttonSize={ButtonSize.LARGE}
              buttonTheme={(groupName && !invalidGroupName) ? ButtonTheme.GREEN : ButtonTheme.GRAY}
              isArrow={true}
            >
              모임 이름 변경하기
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
`

const BottomButtonWrapper = styled.div`
  position: absolute;
  bottom: 40px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
`

export default ChangeGroupName;