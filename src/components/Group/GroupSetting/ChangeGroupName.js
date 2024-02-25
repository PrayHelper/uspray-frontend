import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useGroupSetting } from '../../../hooks/useGroupSetting';
import Button, {ButtonSize, ButtonTheme} from '../../Button/Button';
import UserHeader from '../../UserHeader';
import Input from '../../Input/Input';
import { useEffect } from 'react';
import useToast from '../../../hooks/useToast';
import { ToastTheme } from '../../Toast/Toast';
import { useGroup } from '../../../hooks/useGroup';

const ChangeGroupName = ({name, groupId, setCurrentPage, setShowGroupSetting}) => {
  const { showToast } = useToast({});
  const [groupName, setGroupName] = useState("");
  const [invalidGroupName, setInvalidGroupName] = useState("");
  const {changeGroupName} = useGroupSetting();
  const {refetchGroupList} = useGroup();

  const groupNameCheck = (name) => {
    const groupNameRegEx = /^\s*\S.{0,13}\S?\s*$/;
    return groupNameRegEx.test(name);
  };

  const groupNameChangeHandler = (e) => {
    setGroupName(e.target.value);
    if (!groupNameCheck(e.target.value)) {
      setInvalidGroupName("공백포함 15자 이내");
      return;
    }
    setInvalidGroupName("");
  };

  useEffect(() => {
    setGroupName(name);
  }, []);

  return (
    <Wrapper>
      <UserHeader back={() => setCurrentPage('')}>모임 이름 변경</UserHeader>
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
              disabled={!(groupName && !invalidGroupName)}
              buttonSize={ButtonSize.LARGE}
              buttonTheme={(groupName && !invalidGroupName) ? ButtonTheme.GREEN : ButtonTheme.GRAY}
              isArrow={true}
              handler={() => 
                changeGroupName(
                  {groupId, groupName},
                  {
                    onSuccess: () => {
                      refetchGroupList();
                      setCurrentPage('');
                      setShowGroupSetting(false);
                      showToast({
                        message: "모임 이름이 변경되었어요.",
                        theme: ToastTheme.SUCCESS,
                      });
                    }
                  }
                )
              }
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