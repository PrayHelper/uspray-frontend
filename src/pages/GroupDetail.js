import React from 'react';
import UserHeader from '../components/UserHeader';
import styled from 'styled-components';
import GroupInfo from '../components/Group/GroupDetail/GroupInfo';
import GroupPrayList from '../components/Group/GroupDetail/GroupPrayList';

const GroupDetail = () => {
  const isData = true;
  return (
    <Wrapper>
      <UserHeader>북동1팀</UserHeader>
      <GroupInfo isData={isData}/>
      <GroupPrayList isData={isData}/>
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