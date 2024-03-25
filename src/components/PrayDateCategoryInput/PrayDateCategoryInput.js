import React, { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import SelectDate from "../SelectDate/SelectDate";
import { useRef, useState } from "react";
import styled from "styled-components";
import BlackScreen from "../BlackScreen/BlackScreen";
import CategoryTag from "../CategoryTag/CategoryTag";
import ButtonV2, { ButtonTheme } from "../ButtonV2/ButtonV2";

const PrayDateCategoryInput = ({
  categoryList, // 메인의 카테고리 목록
  showSubModal, // 현재 컴포넌트 창 켜져있는지
  setShowSubModal, // 현재 컴포넌트 창 켜져있는지 set
  inputPlaceHolder,
  maxrow, // 최대 줄바꿈
  maxlen, // 최대 길이
  isDefault, // 디폴트 값 존재하는지
  isShowWordCount, // 글자수 유무
  value, // 이전 화면에서 기도제목 입력 내용
  date, // 이전 화면에서 날짜 선택 내용
  category, // 이전 화면에서 카테고리 선택ID
  setUpdateValue, // api 호출용 기도제목 내용 데이터 저장 함수
  setUpdateDate, // api 호출용 날짜 데이터 저장 함수
  setUpdateCategory, // api 호출용 카테고리 데이터 저장 함수
  onClickFunc, // 버튼 눌렀을 때 이벤트 함수
  buttonText, // 버튼 text
  lockerCount, // [보관함에서만 사용] 선택된 기도제목 개수
}) => {
  const outside = useRef();
  const modalInputRef = useRef(null);
  const [inputCount, setInputCount] = useState(value ? value.length : 0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(category);

  useEffect(() => {
    if (showSubModal && modalInputRef.current) {
      modalInputRef.current.focus();
      const length = modalInputRef.current.value.length;
      modalInputRef.current.setSelectionRange(length, length);
    }
  }, [showSubModal]);

  useEffect(() => {
    setUpdateCategory(selectedCategoryIndex);
  }, [selectedCategoryIndex]);

  const onInputHandler = (e) => {
    const isWhitespace = /^\s*$/.test(e.target.value);
    if (isWhitespace) setInputCount(0);
    else setInputCount(e.target.value.length);

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
            {lockerCount === 0 ? (
              <ModalInputWrapper>
                <ModalInput
                  placeholder={inputPlaceHolder}
                  maxRows={maxrow}
                  minRows={1}
                  cacheMeasurements
                  maxLength={maxlen}
                  onChange={onInputHandler}
                  disabled={isDefault ? true : false}
                  value={value}
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
            ) : (
              <LockerCountText>
                {lockerCount}개의 기도제목을 선택했어요
              </LockerCountText>
            )}
            <SelectDate
              setUpdateDate={setUpdateDate}
              showSubModal={showSubModal}
              date={date}
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
        <FixedButtonContainer>
          {isDefault && (
            <SubTextStyle>
              공유된 기도제목의 내용은 수정할 수 없습니다.
            </SubTextStyle>
          )}
          <ButtonV2
            buttonTheme={ButtonTheme.FILLED}
            disabled={inputCount === 0 && lockerCount === 0}
            handler={onClickFunc}
          >
            {buttonText}
          </ButtonV2>
        </FixedButtonContainer>
      </SubModalWrapper>
    </>
  );
};

PrayDateCategoryInput.defaultProps = {
  inputPlaceHolder: "기도제목을 입력해주세요",
  maxlen: 75,
  maxrow: 3,
  isShowWordCount: true,
  isDefault: false,
  lockerCount: 0,
};

export default PrayDateCategoryInput;

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
  letter-spacing: -0.04em;
`;

const Countwords = styled.span`
  position: absolute;
  bottom: 66px;
  right: 16px;
  font-size: 10px;
  color: var(--color-secondary-grey);
`;

const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const LockerCountText = styled.span`
  font-size: 16px;
  color: var(--color-green);
  padding: 0px 2px 4px;
  height: 23px;
  border-bottom: 1px solid var(--color-white-green);
  margin-bottom: 12px;
`;

const SubTextStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: var(--color-green);
  margin-bottom: 16px;
`;
