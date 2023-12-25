import TextareaAutosize from "react-textarea-autosize";
import SelectDate from "../SelectDate/SelectDate";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BlackScreen from "../BlackScreen/BlackScreen";

const SelectDateInput = ({
  maxlen, // 최대 길이
  maxrow, // 최대 줄바꿈
  inputPlaceHolder,
  setUpdateDate, // api 호출용 날짜 데이터 저장 변수
  showSubModal, // 현재 컴포넌트 창 켜져있는지 변수
  setShowSubModal,
  onClickFunc, // 기도 추가 이벤트 함수
  value,
  setValue,
  // Calender 관련
  selectedDate, // 현재 선택된 날짜 변수
  setSelectedDate,
  showDatePicker, // 달력 show 유무 변수
  setShowDatePicker,
}) => {
  const outside = useRef();
  const inputRef = useRef();

  const [inputCount, setInputCount] = useState(0);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onInputHandler = (e) => {
    if (e.target.value.length > e.maxLength)
      e.target.value = e.target.value.slice(0, e.maxLength);
    setInputCount(e.target.value.length);
    setValue(e.target.value);
  };

  return (
    <>
      <BlackScreen isModalOn={showSubModal} zindex={400} />
      <SubModalWrapper
        showSubModal={showSubModal}
        ref={outside}
        onClick={(e) => {
          if (e.target === outside.current) setShowSubModal(false);
        }}
      >
        <SubModalTop>
          <ModalInputWrapper>
            <ModalInput
              placeholder={inputPlaceHolder}
              maxRows={maxrow}
              minRows={1}
              cacheMeasurements
              maxlength={maxlen}
              onChange={onInputHandler}
              value={value}
              ref={inputRef}
            />
            <Countwords>
              <p>
                {inputCount}자 / {maxlen}자
              </p>
            </Countwords>
          </ModalInputWrapper>
          <SelectDate
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            setUpdateDate={setUpdateDate}
            showSubModal={showSubModal}
          />
        </SubModalTop>
        <SubModalBottom onClick={onClickFunc}>기도제목 작성</SubModalBottom>
      </SubModalWrapper>
    </>
  );
};

SelectDateInput.defaultProps = {
  inputPlaceHolder: "기도제목을 입력해주세요",
  maxlen: 75,
  maxrow: 3,
};

export default SelectDateInput;

const SubModalWrapper = styled.div`
  position: fixed;
  justify-content: space-between;
  left: 50%;
  top: 50%;
  height: calc(100vh - 32px);
  transform: translate(-50%, -50%);
  width: calc(100vw - 32px);
  display: flex;
  flex-direction: column;
  z-index: 500;
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
  resize: none;
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
