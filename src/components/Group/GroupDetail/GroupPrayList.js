import React from 'react';
import styled from 'styled-components';
import GroupPrayItem from './GroupPrayItem';

const GroupPrayList = ({isData}) => {
  return (
    <Wrapper>
      {
        isData ?
          <PrayList>
            <DateDiv>2023.10.27</DateDiv>
            <GroupPrayItem />
            <GroupPrayItem />
          </PrayList>
          :
          <NoDataWrapper>
            <div>북동1팀 모임원에게</div>
            <div>기도제목을 공유해보세요.</div>
          </NoDataWrapper>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  padding-top: 16px;
`;

const NoDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: var(--color-secondary-grey);
  font-size: 24px;
  font-weight: 700;
`;

const PrayList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DateDiv = styled.div`
  padding: 4px 8px;
  color: white;
  font-size: 12px;
  border-radius: 10px;
  width: fit-content;
  background-color: var(--color-dark-green);
`

export default GroupPrayList;