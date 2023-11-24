import TextareaAutosize from "react-textarea-autosize";
import SelectDate from "../SelectDate/selectDate";
import { useRef, useState } from "react";
import styled from "styled-components";

/*
  props 넘겨받을 목록 (History.js 파일 참고하기)
  1. maxlen : 최대 길이, maxrow : 최대 줄바꿈, inputPlaceHolder
  2. selectedBtn, setSelectedBtn 변수 (각 날짜 버튼 클릭 유무)
  3. setUpdateDate 변수 (api 호출용 날짜 데이터 저장)
  4. showSubModal setShowSubModal 변수 (현재 컴포넌트 창 켜져있는지)
  5. onClickFunc 기도 추가 이벤트 함수
  ------ Calender 관련 ------
  1. selectedDate, setSelectedDate 변수 (현재 선택된 날짜)
  2. showDatePicker, setShowDatePicker 변수 (달력 show 유무)
*/

const SelectDateInput = (props) => {
  const outside = useRef();

  const [inputCount, setInputCount] = useState(0);

  const onInputHandler = (e) => {
    if (e.target.value.length > e.maxLength)
      setInputCount(e.value.slice(0, e.maxLength));
    setInputCount(e.target.value.length);
  };

  return (
    <>
      <SubModalWrapper showSubModal={props.showSubModal} ref={outside}>
        <SubModalTop>
          <ModalInputWrapper>
            <ModalInput
              placeholder={props.inputPlaceHolder}
              maxRows={props.maxrow}
              minRows={1}
              cacheMeasurements
              maxlength={props.maxlen}
              onChange={onInputHandler}
            />
            <Countwords>
              <p>
                {inputCount}자 / {props.maxlen}자
              </p>
            </Countwords>
          </ModalInputWrapper>
          <SelectDate
            selectedBtn={props.selectedBtn}
            setSelectedBtn={props.setSelectedBtn}
            selectedDate={props.selectedDate}
            setSelectedDate={props.setSelectedDate}
            showDatePicker={props.showDatePicker}
            setShowDatePicker={props.setShowDatePicker}
            setUpdateDate={props.setUpdateDate}
            showSubModal={props.showSubModal}
          />
        </SubModalTop>
        <SubModalBottom onClick={props.onClickFunc}>
          오늘의 기도에 추가하기
        </SubModalBottom>
      </SubModalWrapper>
    </>
  );
};

export default SelectDateInput;

// const SubModalWrapper = styled.div`
//   position: fixed;
//   justify-content: space-between;
//   left: 50%;
//   top: 50%;
//   height: calc(100vh - 32px);
//   transform: translate(-50%, -50%);
//   width: calc(100vw - 32px);
//   display: flex;
//   flex-direction: column;
//   z-index: 500;
//   opacity: ${(props) => (isShowSubModal ? "1" : "0")};
//   transition: all 0.3s ease-in-out;
//   visibility: ${(props) => (isShowSubModal ? "visible" : "hidden")};
// `;

const SubModalWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: calc(40% + 220px);
  transform: translate(-50%, -50%);

  width: calc(100vw - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 16px;
  z-index: 400;
  opacity: ${(props) => (props.showSubModal ? "1" : "0")};
  transition: all 0.3s ease-in-out;
  visibility: ${(props) => (props.showSubModal ? "visible" : "hidden")};
`;

const SubModalTop = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  padding: 16px 16px;
  background-color: var(--color-white);
`;

const ModalInputWrapper = styled.div``;

const ModalInput = styled(TextareaAutosize)`
  width: 100%;
  margin-bottom: 12px;
  border: none;
  font-size: 16px;
  color: #606060;
  outline: none;
  border-bottom: 1px solid var(--color-white-green);
  ::placeholder {
    color: #b7ceb0; // 원하는 색상으로 변경
  }
  :focus {
    border-bottom: 1px solid var(--color-dark-green);
  }
  font-weight: 400;
`;

const Countwords = styled.span`
  position: absolute;
  bottom: 66px;
  right: 16px;
  font-size: 10px;
  color: var(--color-secondary-grey);
`;

const SubModalBottom = styled.div`
  background: var(--color-dark-green);
  border-radius: 16px;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: var(--color-white);
  padding: 20px 0px;
  &:active {
    transition: all 0.2s ease-in-out;
    filter: ${(props) =>
      props.disabled ? "brightness(1)" : "brightness(0.9)"};
  }
`;
