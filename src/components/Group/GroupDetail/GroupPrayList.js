import React from 'react';
import styled from 'styled-components';
import GroupPrayItem from './GroupPrayItem';

const GroupPrayList = ({group, groupPrayList, isData}) => {
  const groupedData = Object.keys(groupPrayList).map((date) => {
    return {
      date,
      pray: groupPrayList[date],
    };
  });
  return (
    <Wrapper>
      {
        isData ?
          <PrayList>
            {
              groupedData.map((data) => {
                return (
                  <PrayContent>
                    <DateDiv>{data.date}</DateDiv>
                    {data.pray.map((pray) => <GroupPrayItem groupId={group.id} pray={pray}/>)}
                  </PrayContent>
                )
              })
            }
          </PrayList>
          :
          <NoDataWrapper>
            <div>{group.name} 모임원에게</div>
            <div>기도제목을 공유해보세요.</div>
          </NoDataWrapper>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 145px);
  overflow: auto;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const PrayContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`

const DateDiv = styled.div`
  padding: 4px 8px;
  color: white;
  font-size: 12px;
  border-radius: 10px;
  width: fit-content;
  background-color: var(--color-green);
`

export default GroupPrayList;