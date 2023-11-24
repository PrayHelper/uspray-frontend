import React from 'react';
import styled from "styled-components";

const GroupItem = () => {
  return (
    <GroupItemWrapper>
      <GroupTitle>
        <div style={{color: "var(--color-green)", fontSize: "24px", fontWeight: "500"}}>
          북동1팀
        </div>
        <div style={{display: "flex", justifyContent: "center", gap: "2px"}}>
          <img src="images/ic_group_count.svg" alt="group_count_icon" />
          <div style={{color: "var(--color-secondary-grey)", fontSize: "12px"}}>171명</div>
        </div>
      </GroupTitle>
      <GroupContent>
        <div style={{color: "var(--color-grey)", fontSize: "16px"}}>기도를 잘 할 수 있도록...</div>
        <div style={{color: "var(--color-secondary-grey)", fontSize: "12px"}}>3분 전</div>
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