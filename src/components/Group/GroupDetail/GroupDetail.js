import React from 'react';
import UserHeader from '../../UserHeader';
import styled from 'styled-components';
import GroupInfo from './GroupInfo';
import GroupPrayList from './GroupPrayList';
import RightIcons from './RightIcons';
import { useState } from 'react';
import GroupSetting from '../GroupSetting/GroupSetting';

const GroupDetail = ({group, setShowGroupDetail}) => {
  const [showGroupSetting, setShowGroupSetting] = useState(false);

  const groupPrayList = [

  ]; // /grouppray/{groupId} 로 api 호출 후 받아오기
  const isData = groupPrayList.length !== 0;

  return (
    <Wrapper>
      {showGroupSetting && <GroupSetting group={group} setShowGroupSetting={setShowGroupSetting}/>}
      <UserHeader
        rightIcons={() => {
          return <RightIcons group={group} setShow={setShowGroupSetting}/>;
        }}
        back={() => setShowGroupDetail(prev => !prev)}
      >
        {group.name}
      </UserHeader>
      <GroupInfo group={group} isData={isData}/>
      <GroupPrayList name={group.name} groupPrayList={groupPrayList} isData={isData}/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  z-index: 100;
`

export default GroupDetail;