import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Calender from "../Calender/Calender";

/*
  props 넘겨받을 목록 (History.js 파일 참고하기)
  1. setUpdateDate 변수 (api 호출용 날짜 데이터 저장)
  2. showSubModal 변수 (현재 컴포넌트 창 켜져있는지)
*/

const SelectDate = (props) => {
  const dateOptions = [3, 7, 30, 100];
  const [selectedBtn, setSelectedBtn] = useState("");
  const [designedDate, setDesignedDate] = useState(null); // yyyy-mm-dd (요일) 형태
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onClickCalendar = () => {
    if (selectedBtn === "calendar") {
      setSelectedBtn();
    } else {
      setSelectedBtn("calendar");
      setShowDatePicker(!showDatePicker);
    }
  };

  const onChangeDate = (date) => {
    if (typeof date == "number" || date === "") {
      const today = new Date();
      const targetDate = new Date(today.getTime() + date * 24 * 60 * 60 * 1000);
      changeDate(targetDate);
      setSelectedBtn(date); // css 변경용
    } else {
      setSelectedDate(date); // 선택된 날짜 업데이트
      changeDate(date);
      setShowDatePicker(false); // DatePicker 닫기
      setSelectedBtn();
    }
  };

  const changeDate = (date) => {
    const options = { weekday: "short" };
    const formattedDayOfWeek = new Intl.DateTimeFormat("ko-KR", options).format(
      date
    );
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}-${mm}-${dd}`; // 포맷된 날짜
    setDesignedDate(`${yyyy}-${mm}-${dd} ${formattedDayOfWeek}`);
    props.setUpdateDate(formattedDate);
  };

  useEffect(() => {
    if (props.showSubModal) {
      onChangeDate(7);
      setSelectedDate();
    }
  }, [props.showSubModal]);

  return (
    <SelectDateWrapper>
      {dateOptions.map((option) => (
        <SubModalBtn
          key={option}
          isSelected={selectedBtn === option}
          onClick={() => onChangeDate(option)}
        >
          {`${option}일`}
        </SubModalBtn>
      ))}
      <CalenderIcon
        src={
          selectedBtn === "calendar"
            ? "../images/icon_calender_filled.svg"
            : "../images/icon_calender.svg"
        }
        alt="icon_calender"
        onClick={onClickCalendar}
      />

      {showDatePicker && (
        <DatePickerContainer>
          <Calender
            selectedDate={selectedDate}
            onChangeDate={onChangeDate}
            setShowDatePicker={setShowDatePicker}
          />
        </DatePickerContainer>
      )}
      {designedDate && (
        <SubModalDate>~{designedDate.replace(/-/g, ".")}</SubModalDate>
      )}
    </SelectDateWrapper>
  );
};

export default SelectDate;

const SelectDateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const SubModalBtn = styled.div`
  border: 1px solid var(--color-green);
  border-radius: 8px;
  padding: 4px 0px;
  width: 48px;
  word-break: keep-all;
  text-align: center;
  font-size: 12px;
  color: var(--color-green);
  transition: all 0.2s ease-in-out;

  cursor: pointer;
  ${(props) =>
    props.isSelected &&
    css`
      background-color: var(--color-green);
      color: var(--color-white);
    `}
  &:active {
    filter: ${(props) =>
      props.disabled ? "brightness(1)" : "brightness(0.9)"};
    scale: ${(props) => (props.disabled ? "1" : "0.90")};
    transition: all 0.1s ease-in-out;
  }
`;

const SubModalDate = styled.div`
  font-size: 12px;
  color: var(--color-green);
  transform: translateX(-4px);
  margin-left: 4px;
  white-space: nowrap;
`;

const DatePickerContainer = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 16px);
  z-index: 400;
`;

const CalenderIcon = styled.img`
  transition: all 0.2s ease-in-out;
  :active {
    filter: brightness(0.9);
    transform: scale(0.9);
    transition: all 0.1s ease-in-out;
  }
`;
