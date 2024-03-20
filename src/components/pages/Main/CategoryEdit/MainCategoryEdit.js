import { useState } from "react";
import S from "./MainCategoryEdit.style";
import ButtonV2, { ButtonTheme } from "../../../ButtonV2/ButtonV2";

const ColorList = [
  "#D0E8CB",
  "#AEDBA5",
  "#9BD88A",
  "#75BD62",
  "#649D55",
  "#58834D",
  "#507247",
];

const MainCategoryEdit = ({
  selectedCategoryDataToEdit,
  deleteCategoryHandler,
  changeCategoryHandler,
  tabType,
  closeHandler,
}) => {
  const [selectedColor, setSelectedColor] = useState(
    selectedCategoryDataToEdit?.color
  );
  const [inputValue, setInputValue] = useState(
    selectedCategoryDataToEdit?.name
  );

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleInnerClick = (e) => e.stopPropagation();

  if (!selectedCategoryDataToEdit) return null;

  return (
    <S.RootContainer onClick={closeHandler}>
      <S.Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInnerClick}
      />
      <S.FixedButtonContainer onClick={handleInnerClick}>
        <ButtonV2
          buttonTheme={ButtonTheme.OUTLINED}
          handler={() => deleteCategoryHandler(selectedCategoryDataToEdit.id)}>
          카테고리 삭제
        </ButtonV2>
        <ButtonV2
          buttonTheme={ButtonTheme.FILLED}
          disabled={!inputValue}
          handler={() =>
            changeCategoryHandler({
              id: selectedCategoryDataToEdit.id,
              name: inputValue,
              color: selectedColor,
              type: tabType,
            })
          }>
          카테고리 수정
        </ButtonV2>
      </S.FixedButtonContainer>
      <S.ColorPalette>
        {ColorList.map((color) => (
          <S.ColorDrop
            color={color}
            selectedColor={selectedColor}
            onClick={(event) => {
              setSelectedColor(color);
              event.stopPropagation();
            }}
            key={color}
          />
        ))}
      </S.ColorPalette>
    </S.RootContainer>
  );
};

export default MainCategoryEdit;
