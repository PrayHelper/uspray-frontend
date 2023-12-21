import React from 'react';
import UserHeader from '../../UserHeader';
import styled from 'styled-components';
import GroupInfo from './GroupInfo';
import GroupPrayList from './GroupPrayList';
import RightIcons from './RightIcons';
import { useState } from 'react';
import GroupSetting from '../GroupSetting/GroupSetting';
import { useGroupPray } from '../../../hooks/useGroupPray';

const GroupDetail = ({group, setShowGroupDetail}) => {
  const [showGroupSetting, setShowGroupSetting] = useState(false);
  const { groupPrayList } = useGroupPray(group.id);
  const isData = Object.keys(groupPrayList).length !== 0

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
      <GroupWrapper>
        <GroupInfo group={group} isData={isData}/>
        <GroupPrayList group={group} groupPrayList={groupPrayList} isData={isData}/>
      </GroupWrapper>
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

const GroupWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
`

export default GroupDetail;