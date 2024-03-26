import { useEffect, useState } from "react";
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

// 선택된 카테고리 존재 -> 해당 카테고리의 state와 setter 반환, 존재하지 않을 시 null 반환
// 카테고리 선택이 바뀔 때마다 해당 카테고리와 상태 동기화
const useEditState = (category) => {
  const [selectedColor, setSelectedColor] = useState(category?.color);
  const [inputValue, setInputValue] = useState(category?.name);

  useEffect(() => {
    setSelectedColor(category?.color);
    setInputValue(category?.name);
  }, [category]);

  if (!selectedColor || !inputValue) return null;

  return { selectedColor, inputValue, setSelectedColor, setInputValue };
};

const MainCategoryEdit = ({
  selectedCategoryDataToEdit,
  deleteCategoryHandler,
  changeCategoryHandler,
  tabType,
  closeHandler,
}) => {
  const editState = useEditState(selectedCategoryDataToEdit);
  if (!editState) return null;

  const { selectedColor, inputValue, setSelectedColor, setInputValue } =
    editState;

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleInnerClick = (e) => e.stopPropagation();

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
