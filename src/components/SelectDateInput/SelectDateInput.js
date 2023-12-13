import React, { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import SelectDate from "../SelectDate/SelectDate";
import { useRef, useState } from "react";
import styled from "styled-components";
import BlackScreen from "../BlackScreen/BlackScreen";
import CategoryTag from "../CategoryTag/CategoryTag";

const SelectDateInput = ({
  categoryList, // 메인의 카테고리 목록
  showSubModal, // 현재 컴포넌트 창 켜져있는지
  setShowSubModal, // 현재 컴포넌트 창 켜져있는지 set
  inputPlaceHolder,
  maxrow, // 최대 줄바꿈
  maxlen, // 최대 길이
  isDefault, // 디폴트 값 존재하는지
  isShowWordCount, // 글자수 유무
  value, // 이전 입력값
  setUpdateValue, // api 호출용 input 내용 데이터 저장 함수
  setUpdateDate, // api 호출용 날짜 데이터 저장 함수
  setUpdateCategory, // api 호출용 카테고리 데이터 저장 함수
  onClickFunc, // 기도 추가 이벤트 함수
  selectedCategoryIndex,
  setSelectedCategoryIndex,
  buttonText, // 버튼 text
}) => {
  const outside = useRef();
  const modalInputRef = useRef(null);

  const [inputCount, setInputCount] = useState(0);

  useEffect(() => {
    if (showSubModal && modalInputRef.current) {
      modalInputRef.current.focus();
      const length = modalInputRef.current.value.length;
      modalInputRef.current.setSelectionRange(length, length);
    }
  }, [showSubModal]);

  const onInputHandler = (e) => {
    if (e.target.value.length > e.maxLength)
      setInputCount(e.value.slice(0, e.maxLength));
    setInputCount(e.target.value.length);
    if (setUpdateValue) setUpdateValue(e.target.value);
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
        <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
          <SubModalTop>
            <ModalInputWrapper>
              <ModalInput
                placeholder={inputPlaceHolder}
                maxRows={maxrow}
                minRows={1}
                cacheMeasurements
                maxLength={maxlen}
                onChange={onInputHandler}
                disabled={isDefault ? true : false}
                value={isDefault ? "기도제목을 입력하였습니다." : value}
                ref={modalInputRef}
              />
              {isShowWordCount && (
                <Countwords>
                  <p>
                    {inputCount}자 / {maxlen}자
                  </p>
                </Countwords>
              )}
            </ModalInputWrapper>
            <SelectDate
              setUpdateDate={setUpdateDate}
              showSubModal={showSubModal}
            />
          </SubModalTop>
          <SubModalCategory>
            <CategoryTag
              categoryList={categoryList}
              selectedCategoryIndex={selectedCategoryIndex}
              setSelectedCategoryIndex={setSelectedCategoryIndex}
              canAdd={false}
            />
          </SubModalCategory>
        </div>
        <SubModalBottom onClick={onClickFunc}>{buttonText}</SubModalBottom>
      </SubModalWrapper>
    </>
  );
};

SelectDateInput.defaultProps = {
  inputPlaceHolder: "기도제목을 입력해주세요",
  maxlen: 75,
  maxrow: 3,
  isShowWordCount: true,
  isDefault: false,
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

const SubModalCategory = styled.div``;
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
  :disabled {
    background-color: var(--color-white);
    color: var(--color-dark-grey-30);
  }
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
