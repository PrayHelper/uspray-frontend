import styled from "styled-components";

const BtnSet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 40px;
  margin-right: 32px;
  background-color: #7bab6e;
  border: none;
  border-radius: 4px;
  padding: 4px;
`;

const BtnElementDay = styled.button`
  font-size: 10px;
  padding: 2px 6px;
  border: none;
  border-radius: 2px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const BtnElementPrayer = styled.button`
  font-size: 10px;
  padding: 2px 6px;
  border: none;
  border-radius: 2px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const PrayerSortToggle = ({
  dayFucDay,
  dayFucPrayer,
  colorFirst,
  colorSecond,
}) => {
  return (
    <BtnSet>
      <BtnElementDay
        onClick={dayFucDay}
        style={{
          transition: "all 0.2s",
          backgroundColor: colorFirst,
          color: colorSecond,
        }}>
        날짜순
      </BtnElementDay>
      <BtnElementPrayer
        onClick={dayFucPrayer}
        style={{
          transition: "all 0.2s",
          backgroundColor: colorSecond,
          color: colorFirst,
        }}>
        기도순
      </BtnElementPrayer>
    </BtnSet>
  );
};

export default PrayerSortToggle;
