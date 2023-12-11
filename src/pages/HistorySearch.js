import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlackScreen from "../components/BlackScreen/BlackScreen";
import Calender from "../components/Calender/Calender";
import Checkbox, { CheckboxTheme } from "../components/Checkbox/Checkbox";
// prettier-ignore
import { CheckboxWrapper, ContentWrapper, DateBox, DateWrapper, EndDatePickerContainer, Header, MainWrapper, NoDataContent, SearchBar, SearchBarWrapper, SearchBtn, SearchWrapper, StartDatePickerContainer, Wrapper } from "../components/HistorySearch/style";

const HistorySearch = () => {
  const [isClickedCalender, setIsClickedCalender] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigate = useNavigate();
  const today = new Date();

  const onClickBackArrow = () => {
    navigate("/history");
  };

  const onClickStartDateBox = () => {
    setShowStartDatePicker(!showStartDatePicker);
  };

  const onClickEndDateBox = () => {
    setShowEndDatePicker(!showEndDatePicker);
  };

  const onClickCalender = () => {
    setIsClickedCalender(!isClickedCalender);
    setStartDate(updateDate(-30));
    setEndDate(updateDate(0));
  };

  const formatDate = (date) => {
    const options = { weekday: "long" };
    const koreanWeekday = new Intl.DateTimeFormat("ko-KR", options).format(
      date
    );
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}.${mm}.${dd} (${koreanWeekday[0]})`;
    return formattedDate;
  };

  const updateDate = (days) => {
    const today = new Date();
    const targetDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
    return formatDate(targetDate);
  };

  const updateDatePicker = (date) => {
    setSelectedDate(date); // 선택된 날짜 업데이트
    return formatDate(date);
  };

  const onChangeDate = (date, pickerType) => {
    if (pickerType === "start") {
      setStartDate(updateDatePicker(date));
      setShowStartDatePicker(false);
      setShowEndDatePicker(true);
    } else {
      setEndDate(updateDatePicker(date));
      setShowEndDatePicker(false);
    }
  };

  return (
    <>
      <BlackScreen isModalOn={showStartDatePicker || showEndDatePicker} />
      <Wrapper>
        <SearchWrapper>
          <Header>
            <img
              onClick={onClickBackArrow}
              src="../images/ic_back_arrow.svg"
              alt="icon_backArrow"
            />
            <div>히스토리 검색</div>
            <div onClick={onClickCalender}>
              {isClickedCalender ? (
                <img src="../images/ic_calender_gray.svg" alt="icon_calender" />
              ) : (
                <img src="../images/ic_calender.svg" alt="icon_calender" />
              )}
            </div>
          </Header>
          <MainWrapper>
            <SearchBarWrapper>
              <SearchBar placeholder="이름, 내용, 카테고리를 검색하세요." />
              <SearchBtn>
                <img src="../images/ic_search_main.svg" alt="icon_search" />
              </SearchBtn>
            </SearchBarWrapper>
            {isClickedCalender && (
              <DateWrapper isClickedCalender={isClickedCalender}>
                <DateBox
                  isClicked={showStartDatePicker}
                  onClick={onClickStartDateBox}
                >
                  {startDate}
                </DateBox>
                {showStartDatePicker && (
                  <StartDatePickerContainer>
                    <Calender
                      maxDate={today}
                      selectedDate={selectedDate}
                      onChangeDate={(date) => onChangeDate(date, "start")}
                      setShowDatePicker={setShowStartDatePicker}
                    />
                  </StartDatePickerContainer>
                )}
                <img src="../images/ic_thin_arrow.svg" alt="icon_rightArrow" />
                <DateBox
                  isClicked={showEndDatePicker}
                  onClick={onClickEndDateBox}
                >
                  {endDate}
                </DateBox>
                {showEndDatePicker && (
                  <EndDatePickerContainer>
                    <Calender
                      maxDate={today}
                      minDate={selectedDate}
                      selectedDate={selectedDate}
                      onChangeDate={(date) => onChangeDate(date, "end")}
                      setShowDatePicker={setShowEndDatePicker}
                    />
                  </EndDatePickerContainer>
                )}
              </DateWrapper>
            )}
            <CheckboxWrapper>
              <Checkbox
                theme={CheckboxTheme.WHITE}
                id="tos1"
                label={"내가 쓴 기도제목"}
                size={"12px"}
              />
              <Checkbox
                theme={CheckboxTheme.WHITE}
                id="tos1"
                label={"공유받은 기도제목"}
                size={"12px"}
              />
            </CheckboxWrapper>
          </MainWrapper>
        </SearchWrapper>
        <ContentWrapper>
          <div>
            <img src="../images/ic_search_history.svg" alt="icon_searchbar" />
          </div>
          <NoDataContent>히스토리를 검색해보세요</NoDataContent>
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

export default HistorySearch;
