import styled from "styled-components";
import ButtonV2 from "../../components/ButtonV2/ButtonV2";
import { ButtonTheme } from "../../components/Button/Button";
import { TextareaAutosize } from "@mui/material";
import { SelectDateNew } from "../../components/SelectDate/SelectDate";
import { useRef } from "react";
import { createPortal } from "react-dom";

// PrayDateCategoryInput의 개선된 버전, usePrayerInput과 함께 사용
const PrayerInputModal = ({
  // hook level에서 주입되는 props
  isOpened,
  onClickBackground,
  isShared,
  textInputValue,
  onChangeTextInputValue,
  selectedDateValue,
  selectDateValue,
  categoryList,
  selectedCategoryId,
  selectCategoryId,
  onClickBottomButton,
  bottomButtonText,

  // component 사용 단계에서 주입되는 props
  maxRow = 75,
  maxLength = 3,
  showsWordCount = true,
}) => {
  const bgRef = useRef(null);

  if (!isOpened) return null;

  return createPortal(
    <S.BlackBg>
      <S.InnerBg
        ref={bgRef}
        onClick={(e) => {
          if (e.target !== bgRef.current) return;
          onClickBackground();
        }}>
        <S.TopContainer>
          <S.TextAndDateContainer>
            <S.TextInput
              value={textInputValue}
              onChange={onChangeTextInputValue}
              placeholder={"기도제목을 입력해주세요"}
              disabled={isShared}
            />
            <SelectDateNew
              selectDateValue={selectDateValue}
              date={selectedDateValue}
            />
          </S.TextAndDateContainer>
          <S.ListContainer>
            {categoryList.map((category) => (
              <S.ItemContainer
                key={category.id}
                selected={category.id === selectedCategoryId}
                color={category.color}
                onClick={() => selectCategoryId(category.id)}>
                {category.name}
              </S.ItemContainer>
            ))}
          </S.ListContainer>
          {/* 여기에 카테고리 선택 컴포넌트 */}
        </S.TopContainer>
        <S.BottomContainer>
          {isShared && (
            <S.SubTextStyle>
              공유된 기도제목의 내용은 수정할 수 없습니다.
            </S.SubTextStyle>
          )}
          <ButtonV2
            buttonTheme={ButtonTheme.FILLED}
            disabled={textInputValue.length === 0}
            handler={onClickBottomButton}>
            {bottomButtonText}
          </ButtonV2>
        </S.BottomContainer>
      </S.InnerBg>
    </S.BlackBg>,
    document.getElementById("prayer-input-modal")
  );
};

export default PrayerInputModal;

const S = {
  BlackBg: styled.div`
    position: fixed;
    top: 0;
    left: 0;

    height: 100vh;
    width: 100vw;
    transition: all 0.3s ease-in-out;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    z-index: 100;

    display: flex;
    flex-direction: column;
  `,
  InnerBg: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    padding: 16px;
  `,
  TopContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  TextAndDateContainer: styled.div`
    border-radius: 16px;
    padding: 16px 16px;
    background-color: var(--color-white);
  `,
  BottomContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ListContainer: styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    overflow-x: auto;

    // Chrome, Edge 등
    &::-webkit-scrollbar {
      display: none;
    }
    // Firefox
    scrollbar-width: none;
    // IE, Edge
    -ms-overflow-style: none;
  `,
  ItemContainer: styled.div`
    background-color: ${({ selected, color }) =>
      selected ? color : "#EEEEEE"};
    color: ${({ selected, color }) =>
      selected ? (color === "#D0E8CB" ? "#A0A0A0" : "#FFFFFF") : "#CECECE"};
    border-radius: 24px;
    padding: 16px;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    transition: all 0.2s ease-in-out;
  `,
  TextInput: styled(TextareaAutosize)`
    width: 100%;
    margin-bottom: 12px;
    border: none;
    font-size: 16px;
    color: #606060;
    outline: none;
    border-bottom: 1px solid var(--color-white-green);
    letter-spacing: -0.04em;
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
  `,
  SubTextStyle: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: var(--color-green);
    margin-bottom: 16px;
  `,
};
