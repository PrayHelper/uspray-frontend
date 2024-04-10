import { useState } from "react";
import { useMainStates } from "../../../../pages/Main";
import ButtonV2 from "../../../ButtonV2/ButtonV2";
import S from "./MainCategoryModifyModal.style";
import { ButtonTheme } from "../../../Button/Button";

const ColorList = [
  "#D0E8CB",
  "#AEDBA5",
  "#9BD88A",
  "#75BD62",
  "#649D55",
  "#58834D",
  "#507247",
];

const MainCategoryCreateModal = () => {
  const {
    selectedCategoryToEdit,
    categoryInput,
    setCategoryInput,
    setActiveOverlays,
  } = useMainStates();

  const [selectedColor, selectColor] = useState(selectedCategoryToEdit?.color);

  const handleInputChange = (e) => setCategoryInput(e.target.value);

  const handleInnerClick = (e) => e.stopPropagation();

  const deleteCategoryHandler = () => {};

  const modifyHandler = () => {};

  const closeHandler = () => {
    setActiveOverlays([]);
  };

  return (
    <S.RootContainer onClick={closeHandler}>
      <S.Input
        type="text"
        value={categoryInput}
        onChange={handleInputChange}
        onClick={handleInnerClick}
      />
      <S.FixedButtonContainer onClick={handleInnerClick}>
        <ButtonV2
          buttonTheme={ButtonTheme.FILLED}
          disabled={!categoryInput}
          handler={modifyHandler}>
          카테고리 추가
        </ButtonV2>
      </S.FixedButtonContainer>
      <S.ColorPalette>
        {ColorList.map((color) => (
          <S.ColorDrop
            color={color}
            selectedColor={selectedColor}
            onClick={(event) => {
              selectColor(color);
              event.stopPropagation();
            }}
            key={color}
          />
        ))}
      </S.ColorPalette>
    </S.RootContainer>
  );
};

export default MainCategoryCreateModal;
