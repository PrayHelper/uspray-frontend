import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import X_image from "../../images/ic_modify_cancel.svg";
import Day_Calender from '../../images/day_calender.svg';
import Day_Calender_hover from "../../images/DayCalender_hover.svg";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";

const ModifyStyle = styled.div`
    position: fixed;
    top: 1;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    background-color: #FFFFFF;
    border: 0px solid #FFFFFF;
    z-index: 103;
    transition: all 0.5s ease-in-out;
`;
const ModifyBtn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: #7BAB6E;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    color: #FFFFFF;
    margin-top: 16px;
    box-sizing: border-box;
    padding: 20px 0px;
`;
const TopContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    border-bottom: 1px solid #EEEEEE;
    padding: 12px 16px 12px 0px;
    box-sizing: border-box;
`
const X_Image = styled(Logo)`
    width: 24px;
    height: 24px;
`;

const DayCalender = styled(Logo)`
`;

const DateSet = styled.div`
    display:flex;
    padding-right: 16px;
    margin-top: 16px;
    flex-direction: row-reverse
`
const StyleName = styled.input`
    width: 60px;
    height: 23px;
    font-size: 16px;
    text-align: center;
    font-family: Noto Sans KR;
    font-weight: 400;
    color: #75BD62;
    outline: none;
    border: none;
    border-bottom: 1px solid #EEEEEE;
`

const DatePickerContainer = styled.div`
  position: absolute;
  top: calc(-32% - 4px);
  left: calc(27% - 8px);
  z-index: 400;
`;

const DatePickerHeader = styled.div`
  /* background: #7bab6e; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 15px 16px 12px;
  /* align-items: center; */
`;

const DatePickerHeaderDate = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;


const ModifyBar = ({id, valueChange, onModify, clickData, isModify,updateDate,setUpdateDate , dayToggle, setDayToggle}) =>{
    const [value , setValue] = useState("");
    const [name, setName] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [storedData, setStoredData] = useState(null);
    useEffect(()=>{
      setValue(clickData.text);
      setName(clickData.name);
    },[clickData]);
    const onChangeValue = (e) =>{
        setValue(e.target.value);
    }
    const onToggle = () =>{
        setShowDatePicker(!showDatePicker);
        setStoredData(updateDate);
        setSelectedDate(new Date(updateDate));
        setDayToggle(true);
    }

    const onName = (e) =>{
        setName(e.target.value)
    }

    const onChangeDatePicker = (date) => {
        setSelectedDate(date); // 선택된 날짜 업데이트
        calculateDate(date);
        setShowDatePicker(false); // DatePicker 닫기
        setDayToggle(true);
      };

    const calculateDate = (date) =>{
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${yyyy}-${mm}-${dd}`; // 포맷된 날짜 생성
        setUpdateDate(formattedDate);   
    }

    const onClickOut = () =>{
      setShowDatePicker(false);
      setDayToggle(true);
      setUpdateDate(storedData);
    }
    return(
        <ModifyStyle style={{opacity : isModify ? "1" : "0" , transform : isModify ? "translateY(0%)" : "translateY(100%)"}}>
        {showDatePicker ? 
        <DatePickerContainer>
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
                    onClick={
                      !prevMonthButtonDisabled
                        ? decreaseMonth
                        : undefined
                    }
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
          selected={selectedDate}
          onChange={(date) => onChangeDatePicker(date)}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          popperPlacement="bottom-start"
          onClickOutside={() => onClickOut()}
          locale={ko}
          inline
        />
      </DatePickerContainer> : ""}
        <TopContainer>
            <X_Image src={X_image} onClick={onModify}></X_Image>
        </TopContainer>
        <div style={{width: '100%', display: 'flex',padding: "16px 11px 0px 12px", boxSizing:"border-box"}}>
        <StyleName placeholder = {name} type="text" value = {name} onChange={onName}></StyleName>
            <textarea style={{display:"flex",flexGrow:"1", minHeight:'85px',marginLeft:"20px",border:'none',borderBottom: '1px solid #EEEEEE', outline: 'none',
            fontFamily: 'Noto Sans KR', fontStyle: "normal", fontWeight:'400', fontSize:'16px',lineHeight:'23px', color:'#808080'}} value={value}
            onChange={onChangeValue}></textarea>
        </div>
        <DateSet>
        {(updateDate) ? <div style={{marginLeft:"4px", fontFamily: "Noto Sans KR", fontStyle: "normal", fontWeight:"400", 
        fontSize:"16px", lineHeight:"23px", color:" #75BD62"}} onClick={onToggle}>{"~"+ updateDate}</div> : ""}
        <div><DayCalender src={(dayToggle) ? Day_Calender_hover : Day_Calender} onClick={onToggle}/></div>
        </DateSet>
        {value === "" ? <ModifyBtn style={{backgroundColor: "#EEEEEE"}}>수정 완료하기</ModifyBtn>: 
        <ModifyBtn onClick={() => valueChange(id, value, name, updateDate)}>수정 완료하기</ModifyBtn>}
        </ModifyStyle>
    )
}

export default ModifyBar;