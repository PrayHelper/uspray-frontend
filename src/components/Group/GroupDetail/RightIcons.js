import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const RightIcons = ({group, setShow}) => {
  const [noticeOn, setNoticeOn] = useState(true);
  const isLeader = true;
  return (
    <Wrapper>
      <div onClick={() => setNoticeOn(prev => !prev)}>
        {
          noticeOn ?
            <img src='images/ic_group_notice_on.svg' alt='group_notice_icon'/>
            :
            <img src='images/ic_group_notice_off.svg' alt='group_notice_icon'/>
        }
      </div>
      <div>
        {
          isLeader ?
            <img src='images/ic_group_setting.svg' alt='group_setting_icon' onClick={() => setShow(prev => !prev)}/>
            :
            <img src='images/ic_group_leave.svg' alt='group_leave_icon'/>
        }
        {/* 관리자인지 멤버인지에 따라 아이콘 다름 */}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export default RightIcons;