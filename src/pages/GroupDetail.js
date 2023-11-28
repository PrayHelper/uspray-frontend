import React from 'react';
import UserHeader from '../components/UserHeader';
import styled from 'styled-components';
import GroupInfo from '../components/Group/GroupDetail/GroupInfo';
import GroupPrayList from '../components/Group/GroupDetail/GroupPrayList';
import { useLocation } from 'react-router-dom';
import RightIcons from '../components/Group/GroupDetail/RightIcons';

const GroupDetail = () => {
  const location = useLocation();
  const group = location.state;

  const groupPrayList = [

  ]; // /grouppray/{groupId} 로 api 호출 후 받아오기
  const isData = groupPrayList.length !== 0;

  return (
    <Wrapper>
      <UserHeader
        rightIcons={() => {
          return <RightIcons />;
        }}
      >
        {group.name}
      </UserHeader>
      <GroupInfo group={group} isData={isData}/>
      <GroupPrayList groupPrayList={groupPrayList} isData={isData}/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export default GroupDetail;