import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const GroupPrayItem = () => {
  const [heart, setHeart] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  return (
    <Wrapper>
      <div style={{padding: "12px 16px", display: "flex", gap: "40px"}}>
        <PrayContent>
          <div style={{fontSize: "14px", color: "var(--color-green)"}}>김은혜</div>
          <div style={{fontSize: "12px", color: "var(--color-group-pray-content)"}}>
            현재 오랫동안 감기가 낫지 않아 일상에 제대로 집중하지 못하고 있습니다. 빠르게 회복하여 다시 열정을 가지고 시험 준비에 임할 수 있도록 기도해주세요!
          </div>
        </PrayContent>
        <PrayButton>
          {
            heart ? 
            <img src="images/ic_group_heart_filled.svg" alt="filled_heart_icon" /> :
            <img onClick={() => setHeart(true)} src="images/ic_group_heart.svg" alt="heart_icon" />
          } 
          {
            bookmark ?
            <img src="images/ic_group_bookmark_filled.svg" alt="filled_bookmark_icon" /> :
            <img onClick={() => setBookmark(true)} src="images/ic_group_bookmark.svg" alt="bookmark_icon" />
          }
        </PrayButton>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #0000001A;
`

const PrayContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const PrayButton = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  gap: 8px;
  border-radius: 16px;
  height: fit-content;
  background-color: var(--color-group-pray-button-background);
`

export default GroupPrayItem;