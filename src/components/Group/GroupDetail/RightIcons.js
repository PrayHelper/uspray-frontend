import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RightIcons = ({group, setShow, groupNoti}) => {
  const navigate = useNavigate();
  const [noticeOn, setNoticeOn] = useState(groupNoti);
  const isLeader = group.leader;
  return (
    <Wrapper>
      <div onClick={() => setNoticeOn(prev => !prev)}>
        {
          noticeOn ?
            <img
              src='images/ic_group_notice_on.svg'
              alt='group_notice_on_icon'
              onClick={() => {
              }}
            />
            :
            <img
              src='images/ic_group_notice_off.svg'
              alt='group_notice_off_icon'
              onClick={() => {
              }}
            />
        }
      </div>
      <div>
        {
          isLeader ?
            <img src='images/ic_group_setting.svg' alt='group_setting_icon' onClick={() => setShow(prev => !prev)}/>
            :
            <img src='images/ic_group_leave.svg' alt='group_leave_icon' onClick={() => navigate('/leaveGroup', { state: {groupId: group.id} })}/>
        }
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