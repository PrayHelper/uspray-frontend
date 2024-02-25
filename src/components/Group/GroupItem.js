import React from "react";
import styled from "styled-components";
import { useGroupPray } from "../../hooks/useGroupPray";

// group = {
//   id: 0,
//   name: "string",
//   lastPrayContent: "string",
//   memberCount: 0,
//   prayCount: 0,
//   updatedAt: "2023-11-24T10:06:06.136Z"
// }

const GroupItem = ({ group, setGroup, setShowGroupDetail }) => {
  const { groupHeartCount } = useGroupPray(group.id);
  const formatUpdatedAt = (updatedAt) => {
    if (updatedAt === null) return null;
    const currentTime = new Date();
    const updateTime = new Date(updatedAt);
    const timeDifference = currentTime - updateTime;

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

  const formatLastPrayContent = () => {
    if (group.lastPrayContent === null)
      return (
        <div style={{ color: "var(--color-grey)", fontSize: "16px" }}>
          기도제목을 이곳에 공유해보세요!
        </div>
      );

    const currentTime = new Date();
    const updateTime = new Date(group.updatedAt);
    const timeDifference = currentTime - updateTime;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const maxLength = 17;
    const originalText = group.lastPrayContent;

    if (days < 1)
      return (
        <div style={{ color: "var(--color-grey)", fontSize: "16px" }}>
          {originalText.length > maxLength
            ? originalText.slice(0, maxLength) + " ..."
            : originalText}
        </div>
      );
    else
      return (
        <div
          style={{ color: "var(--color-secondary-green)", fontSize: "16px" }}
        >
          {groupHeartCount}개의 기도제목이 있어요!
        </div>
      ); // TODO: api 수정되면 바꾸기
  };

  return (
    <GroupItemWrapper
      onClick={() => {
        setGroup(group);
        setShowGroupDetail((prev) => !prev);
      }}
    >
      <GroupTitle>
        <div
          style={{
            color: "var(--color-green)",
            fontSize: "24px",
            fontWeight: "500",
          }}
        >
          {group.name}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "2px" }}>
          <img src="images/ic_group_count.svg" alt="group_count_icon" />
          <div
            style={{ color: "var(--color-secondary-grey)", fontSize: "12px" }}
          >
            {group.memberCount}명
          </div>
        </div>
      </GroupTitle>
      <GroupContent>
        {formatLastPrayContent()}
        <div style={{ color: "var(--color-secondary-grey)", fontSize: "12px" }}>
          {formatUpdatedAt(group.updatedAt)}
        </div>
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
  box-shadow: 0px 4px 24px 0px #0000001a;
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
