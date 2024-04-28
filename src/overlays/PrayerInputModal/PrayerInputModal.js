import ButtonV2 from "../../components/ButtonV2/ButtonV2";
import { ButtonTheme } from "../../components/Button/Button";
import { SelectDateNew } from "../../components/SelectDate/SelectDate";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import S from "./styles";

// PrayDateCategoryInput의 개선된 버전, usePrayerInput과 함께 사용
const PrayerInputModal = ({
  // hook level에서 주입되는 props
  isShow,
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
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef?.current) inputRef.current.focus();
  }, [isShow]);

  return createPortal(
    <>
      <S.BlackBg isShow={isShow} onClick={onClickBackground} />
      <S.Outer isShow={isShow}>
        <S.Inner>
          <S.TopContainer isShow={isShow}>
            <S.TextAndDateContainer>
              <S.TextInput
                ref={inputRef}
                value={textInputValue}
                onChange={onChangeTextInputValue}
                placeholder={"기도제목을 입력해주세요"}
                disabled={isShared}
              />
              <SelectDateNew
                selectDate={selectDateValue}
                selectedDate={selectedDateValue}
              />
            </S.TextAndDateContainer>
            <S.CategoryListContainer>
              {categoryList.map((category) => (
                <S.CategoryItemContainer
                  key={category.id}
                  selected={category.id === selectedCategoryId}
                  color={category.color}
                  onClick={() => selectCategoryId(category.id)}>
                  {category.name}
                </S.CategoryItemContainer>
              ))}
            </S.CategoryListContainer>
          </S.TopContainer>
          <S.BottomContainer isShow={isShow}>
            {isShared && (
              <S.SubTextStyle>
                공유된 기도제목의 내용은 수정할 수 없습니다.
              </S.SubTextStyle>
            )}
            <ButtonV2
              buttonTheme={ButtonTheme.FILLED}
              disabled={!textInputValue.length || !selectedCategoryId}
              handler={onClickBottomButton}>
              {bottomButtonText}
            </ButtonV2>
          </S.BottomContainer>
        </S.Inner>
      </S.Outer>
    </>,
    document.getElementById("prayer-input-modal")
  );
};

export default PrayerInputModal;
