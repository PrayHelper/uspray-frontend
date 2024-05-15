import ButtonV2 from "../../components/ButtonV2/ButtonV2";
import { ButtonTheme } from "../../components/Button/Button";
import { SelectDateNew } from "../../components/SelectDate/SelectDate";
import { createPortal } from "react-dom";
import S from "./styles";

// PrayDateCategoryInput의 개선된 버전, usePrayerInput과 함께 사용
const PrayerSaveModal = ({
  // hook level에서 주입되는 props
  isShow,
  selectedListLength,
  onClickBackground,
  selectedDateValue,
  setSelectedDateValue,
  categoryList,
  selectedCategoryId,
  setSelectedCategoryId,
  onClickBottomButton,
}) => {
  return createPortal(
    <>
      <S.BlackBg isShow={isShow} onClick={onClickBackground} />
      <S.Outer isShow={isShow}>
        <S.Inner>
          <S.TopContainer isShow={isShow}>
            <S.TextAndDateContainer>
              <S.SaveCountText>
                {selectedListLength}개의 기도제목이 선택되었어요
              </S.SaveCountText>
              <SelectDateNew
                selectDate={setSelectedDateValue}
                selectedDate={selectedDateValue}
              />
            </S.TextAndDateContainer>
            <S.CategoryListContainer>
              {categoryList.map((category) => (
                <S.CategoryItemContainer
                  key={category.id}
                  selected={category.id === selectedCategoryId}
                  color={category.color}
                  onClick={() => setSelectedCategoryId(category.id)}>
                  {category.name}
                </S.CategoryItemContainer>
              ))}
            </S.CategoryListContainer>
          </S.TopContainer>
          <S.BottomContainer isShow={isShow}>
            <S.SubTextStyle>
              공유된 기도제목의 내용은 수정할 수 없습니다.
            </S.SubTextStyle>
            <ButtonV2
              buttonTheme={ButtonTheme.FILLED}
              disabled={!selectedCategoryId}
              handler={onClickBottomButton}>
              내 기도수첩에 저장하기
            </ButtonV2>
          </S.BottomContainer>
        </S.Inner>
      </S.Outer>
    </>,
    document.getElementById("prayer-input-modal")
  );
};

export default PrayerSaveModal;
