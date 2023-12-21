import React from 'react';
import UserHeader from '../../UserHeader';
import styled from 'styled-components';
import GroupInfo from './GroupInfo';
import GroupPrayList from './GroupPrayList';
import RightIcons from './RightIcons';
import { useState } from 'react';
import GroupSetting from '../GroupSetting/GroupSetting';
import { useGroupPray } from '../../../hooks/useGroupPray';
import useFlutterWebview from '../../../hooks/useFlutterWebview';

const GroupDetail = ({group, setShowGroupDetail}) => {
  const [showGroupSetting, setShowGroupSetting] = useState(false);
  const { groupPrayList } = useGroupPray(group.id);
  const isData = Object.keys(groupPrayList).length !== 0
  const { shareLink, isMobile } = useFlutterWebview();
  const WEB_ORIGIN = process.env.REACT_APP_WEB_ORIGIN;

  const onInvite = async () => {
    const groupId = group.id;
    var encodeGroupId = window.btoa(groupId.toString());
    if (isMobile()) {
      if (/android/i.test(navigator.userAgent)) {
        shareLink({
          title: "Web_invite",
          url: `${WEB_ORIGIN}/group?id=` + encodeGroupId,
        });
      } else if (
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        navigator.share
      ) {
        navigator.share({
          title: "Web_invite",
          url: `${WEB_ORIGIN}/group?id=` + encodeGroupId,
        });
      } else {
        alert("초대하기가 지원되지 않는 환경 입니다.");
      }
    }
    console.log(`${WEB_ORIGIN}/group?id=` + encodeGroupId);
  };

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
        <GroupPrayList name={group.name} groupPrayList={groupPrayList} isData={isData}/>
      </GroupWrapper>
      <InviteBtn src="images/ic_group_invite.svg" alt="group_invite_icon" onClick={() => onInvite()} />
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

const InviteBtn = styled.img`
  position: fixed;
  bottom: 80px;
  right: 20px;
`

export default GroupDetail;