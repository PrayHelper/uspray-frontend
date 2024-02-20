import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlackScreen from "../components/BlackScreen/BlackScreen";
import Calender from "../components/Calender/Calender";
import Checkbox, { CheckboxTheme } from "../components/Checkbox/Checkbox";
import { useHistory } from "../hooks/useHistory";
import {
  CheckboxWrapper,
  DateBox,
  DateWrapper,
  EndDatePickerContainer,
  Header,
  MainWrapper,
  NoDataContent,
  SearchBar,
  SearchBarWrapper,
  SearchBtn,
  SearchWrapper,
  StartDatePickerContainer,
  Wrapper,
} from "../components/HistorySearch/style";
import { useEffect } from "react";

const HistorySearch = ({
  setIsOverlayOn,
  ref,
  HisContent,
  onClickHistoryItem,
  onClickModify,
  setUpdateCategory,
  setUpdateDate,
  firstCategoryIndex,
  setShowSubModal,
  showSubModal,
  categoryList,
  PrayDateCategoryInput,
  onClickExitModal,
  onClickSubModal,
  PrayDetailModal,
  showModal,
  isEmptyData,
  NoDataWrapper,
  defaultOptions,
  Lottie,
  LottieWrapper,
}) => {
  const [isClickedCalender, setIsClickedCalender] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [keyWord, setKeyWord] = useState("");
  const [page, setPage] = useState(0);
  const [isPersonal, setIsPersonal] = useState(true);
  const [isShared, setIsShared] = useState(true);
  const { searchHistory } = useHistory();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const today = new Date();
  const [NoDataText, setNoDataText] = useState("히스토리를 검색해보세요");
  const [tab, setTab] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    setStartDate(updateDate(-30));
    setEndDate(updateDate(0));
  }, []);

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

  const apiFormDate = (inputDate) => {
    const parts = inputDate.split(" ");
    const dateString = parts[0];
    const replacedString = dateString.replace(/\./g, "-");
    return replacedString;
  };

  const onClickSearch = () => {
    if (keyWord === "") return;
    setLoading(true);
    searchHistory(
      {
        keyword: keyWord,
        startDate: apiFormDate(startDate),
        endDate: apiFormDate(endDate),
        page: page,
        size: 15,
        isPersonal: isPersonal,
        isShared: isShared,
      },
      {
        onSuccess: (res) => {
          setData(res.data.data.historyList);
          if (res.data.data.historyList.length === 0)
            setNoDataText("검색 결과가 없습니다");
        },
      }
    );
    setLoading(false);
  };

  const toggleHandler = (event) => {
    const { id } = event.target;

    id === "personal"
      ? setIsPersonal((prev) => !prev)
      : setIsShared((prev) => !prev);
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
              onClick={() => setIsOverlayOn(false)}
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
              <SearchBar
                placeholder="이름, 내용, 카테고리를 검색하세요."
                value={keyWord}
                onChange={(e) => setKeyWord(e.target.value)}
              />
              <div onClick={onClickSearch}>
                <SearchBtn>
                  <img src="../images/ic_search_main.svg" alt="icon_search" />
                </SearchBtn>
              </div>
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
                id="personal"
                label={"내가 쓴 기도제목"}
                size={"12px"}
                checked={isPersonal}
                handler={toggleHandler}
              />
              <Checkbox
                theme={CheckboxTheme.WHITE}
                id="shared"
                label={"공유받은 기도제목"}
                size={"12px"}
                checked={isShared}
                handler={toggleHandler}
              />
            </CheckboxWrapper>
          </MainWrapper>
        </SearchWrapper>
        {loading && (
          <LottieWrapper>
            <Lottie
              style={{ scale: "0.5", marginTop: "50px" }}
              options={defaultOptions}
              height={300}
              width={300}
              isClickToPauseDisabled={true}
            />
          </LottieWrapper>
        )}
        {!loading && isEmptyData(data) && (
          <NoDataWrapper>
            <div>
              <img src="../images/ic_search_history.svg" alt="icon_searchbar" />
            </div>
            <NoDataContent>{NoDataText}</NoDataContent>
          </NoDataWrapper>
        )}
        <div>
          <BlackScreen isModalOn={showModal} />
          {!isEmptyData(data) && showModal && (
            <PrayDetailModal
              showSubModal={showSubModal}
              currentData={currentData}
              onClickSubModal={onClickSubModal}
              onClickExitModal={onClickExitModal}
            />
          )}
          <PrayDateCategoryInput
            categoryList={categoryList}
            showSubModal={showSubModal}
            setShowSubModal={setShowSubModal}
            isDefault={true}
            isShowWordCount={false}
            value=""
            category={firstCategoryIndex}
            setUpdateDate={setUpdateDate}
            setUpdateCategory={setUpdateCategory}
            onClickFunc={() => onClickModify(tab)}
            buttonText="오늘의 기도에 추가"
          />
        </div>
        <div>
          {/* <div> */}
          {data.map((el) => (
            <div
              onClick={(e) => onClickHistoryItem(e, tab)}
              key={el.historyId}
              id={el.historyId}
            >
              <HisContent
                name={el.name}
                content={el.content}
                date={`${el.createdAt.split("T")[0]} ~ ${el.deadline}`}
              />
              <div ref={ref}></div>
            </div>
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default HistorySearch;
