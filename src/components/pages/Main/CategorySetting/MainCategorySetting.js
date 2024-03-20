import { ButtonTheme } from "../../../Button/Button";
import ButtonV2 from "../../../ButtonV2/ButtonV2";
import S from "./MainCategorySetting.style";

const MainCategorySetting = ({
  isShow,
  onClose,
  inputValue,
  onChangeInputValue,
  createCategoryHandler,
}) => {
  isShow = false;

  if (!isShow) return null;

  return (
    <S.Container onClick={onClose}>
      <S.CategoryInput
        type="text"
        value={inputValue}
        placeholder={"카테고리를 입력해주세요"}
        onChange={onChangeInputValue}
        onClick={(e) => e.stopPropagation()}
      />
      <S.FixedButtonContainer onClick={(e) => e.stopPropagation()}>
        <ButtonV2
          buttonTheme={ButtonTheme.FILLED}
          disabled={!inputValue}
          handler={() =>
            createCategoryHandler({
              name: inputValue,
              color: "TEMP",
              type: "TEMP",
            })
          }>
          카테고리 추가
        </ButtonV2>
      </S.FixedButtonContainer>
    </S.Container>
  );
};

export default MainCategorySetting;
