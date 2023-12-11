import React from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

// group = {
//   id: 0,
//   name: "string",
//   lastPrayContent: "string",
//   memberCount: 0,
//   prayCount: 0,
//   updatedAt: "2023-11-24T10:06:06.136Z"
// }

const GroupItem = ({group}) => {
  const navigate = useNavigate();
  const formatUpdatedAt = (updatedAt) => {
    const currentTime = new Date();
    const timeDifference = currentTime - new Date(updatedAt);

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));

    if (minutes < 1) {
      return "방금 전";
    } else if (hours < 1) {
      return `${minutes}분 전`;
    } else if (days < 1) {
      return `${hours}시간 전`;
    } else if (days < 7) {
      return `${days}일 전`;
    } else if (months < 1) {
      return `${Math.floor(days / 7)}주 전`;
    } else if (months < 12) {
      return `${months}개월 전`;
    } else {
      return `${years}년 전`;
    }
  };

  return (
    <GroupItemWrapper onClick={() => navigate('/groupDetail', { state: group })} >
      <GroupTitle>
        <div style={{color: "var(--color-green)", fontSize: "24px", fontWeight: "500"}}>
          {group.name}
        </div>
        <div style={{display: "flex", justifyContent: "center", gap: "2px"}}>
          <img src="images/ic_group_count.svg" alt="group_count_icon" />
          <div style={{color: "var(--color-secondary-grey)", fontSize: "12px"}}>{group.memberCount}명</div>
        </div>
      </GroupTitle>
      <GroupContent>
        <div style={{color: "var(--color-grey)", fontSize: "16px"}}>{group.lastPrayContent}</div>
        <div style={{color: "var(--color-secondary-grey)", fontSize: "12px"}}>{formatUpdatedAt(group.updatedAt)}</div>
      </GroupContent>
    </GroupItemWrapper>
  );
};

const GroupItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0px 4px 24px 0px #0000001A;
`;

const GroupTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const GroupContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default GroupItem;