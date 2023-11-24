import React from 'react';
import styled from 'styled-components';

const GroupInfo = ({isData}) => {
  return (
    <Wrapper>
      {
        isData ?
          <GroupInfoText>
            <div>오늘 하루동안</div>
            <div>
              <span style={{color: "var(--color-green)"}}>289명</span>
              <span>이 기도했어요!</span>
            </div>
          </GroupInfoText>
          : 
          <GroupInfoText>
            <div>
              <span style={{color: "var(--color-green)"}}>북동1팀</span>
              <span> 모임이</span>
            </div>
            <div>새롭게 태어났어요!</div>
          </GroupInfoText>
      }
      <PrayInput>
        <input style={{width: "100%"}} placeholder='기도제목을 입력해주세요.'></input>
        <LoadButton>
          <img src="images/ic_group_load.svg" alt="group_load_icon" />
          <div>불러오기</div>
        </LoadButton>
      </PrayInput>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 145px;
  background-color: var(--color-light-green);
  padding: 24px 16px;
  gap: 24px;
`;

const PrayInput = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`

const LoadButton = styled.div`
  display: flex;
  color: white;
  border-radius: 16px;
  background-color: var(--color-dark-green);
  padding: 14px 12px;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
`

const GroupInfoText = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: var(--color-green-80);
;
`
export default GroupInfo;