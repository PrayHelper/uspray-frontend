import React from "react";
import styled from "styled-components";
import ShareCheckBox from "./ShareCheckBox";
import ShareBotCheckBox from "./ShareBotCheckBox";
import { ReactComponent as HeartImage } from "../../images/ic_full_heart_image.svg";

const MainContent = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 12px 0 16px;
  border-bottom: 1px solid #b3d1ab;
  transition: all 0.3s ease-in-out;
  padding-bottom: 8px;
`;

const NameContent = styled.div`
  flex-shrink: 0;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  padding-right: 8px;
  border-right: 1px solid #cecece;
`;

const TextContent = styled.div`
  margin: 0px 8px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  word-break: break-all;
  flex: 1;
`;

const DdayContent = styled.div`
  flex-shrink: 0;
  font-size: 12px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  line-height: 17px;
  margin-right: 8px;
`;
const ClickImg = styled(HeartImage)`
  width: 24px;
  height: 24px;
  transition: all 0.3s;
  flex-shrink: 0;
  path {
    fill: none;
    stroke: #ff8989;
    stroke-width: 1;
  }
  &:active {
    filter: brightness(0.9);
    transform: scale(0.9);
    path {
      fill: #ff8989;
      stroke: none;
    }
  }
`;

function PrayerContent({
  content,
  dayToggle,
  countUpdate,
  bottom,
  contentClick,
  isShared,
  shareList,
  clickOff,
}) {
  const { id, dday, text, checked, name, count, isShare } = content;
  const clickHandler = (event) => {
    if (!checked) {
      return shareList(event.target.id, !checked);
    } else {
      clickOff(id);
    }
  };
  return (
    <MainContent>
      {isShared &&
        (!bottom ? (
          <ShareCheckBox id={id} checked={checked} handler={clickHandler} />
        ) : (
          <ShareBotCheckBox id={id} checked={checked} handler={clickHandler} />
        ))}
      <NameContent
        style={{ color: bottom ? "#FFFFFF" : "#7BAB6F" }}
        onClick={() => contentClick(id, checked, isShare)}>
        {name}
      </NameContent>
      <TextContent
        style={{ color: bottom ? "#D0E8CB" : "#496143" }}
        onClick={() => contentClick(id, checked, isShare)}>
        {text}
      </TextContent>
      {dayToggle ? (
        <DdayContent
          style={{ color: bottom ? "#FFFFFF" : "#A1B398", fontSize: "12px" }}>
          {dday !== 0 ? "D-" + dday : "D-Day"}
        </DdayContent>
      ) : (
        <DdayContent style={{ color: bottom ? "#FFFFFF" : "#A1B398" }}>
          {count + "회"}
        </DdayContent>
      )}
      {!isShared && !bottom ? (
        <ClickImg src={HeartImage} onClick={() => countUpdate(id)} />
      ) : (
        <div style={{ height: "24px" }}></div>
      )}
    </MainContent>
  );
}

export default PrayerContent;
