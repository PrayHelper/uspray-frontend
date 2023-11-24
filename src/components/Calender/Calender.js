import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import "./Calender.css";
// props 넘겨받을 목록
// 1. selectedDate 변수 (현재 선택된 날짜)
// 2. onChangeDatePicker 함수 (날짜 선택시 반영)
// 3. setShowDatePicker 변수 (달력 보여줄 지 설정)
// History.js 파일 참고하기

const Calender = (props) => {
  return (
    <DatePicker
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <DatePickerHeader>
          <DatePickerHeaderDate>
            {date.getFullYear()}년 {date.getMonth() + 1}월
          </DatePickerHeaderDate>
          <div style={{ gap: "12px", display: "flex" }}>
            {!prevMonthButtonDisabled && (
              <img
                onClick={!prevMonthButtonDisabled ? decreaseMonth : undefined}
                disabled={prevMonthButtonDisabled}
                src="../images/ic_left_arrow.svg"
                alt="icon_left_arrow"
              />
            )}
            <img
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              src="../images/ic_right_arrow.svg"
              alt="icon_right_arrow"
            />
          </div>
        </DatePickerHeader>
      )}
      selected={props.selectedDate}
      onChange={(date) => props.onChangeDate(date)}
      minDate={new Date()}
      dateFormat="yyyy-MM-dd"
      popperPlacement="bottom-start"
      onClickOutside={() => props.setShowDatePicker(false)}
      locale={ko}
      inline
    />
  );
};

export default Calender;

const DatePickerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 15px 16px 12px;
`;

const DatePickerHeaderDate = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;
