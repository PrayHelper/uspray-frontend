import { useState } from "react";
import { ButtonTheme } from "../../../Button/Button";
import ButtonV2 from "../../../ButtonV2/ButtonV2";
import S from "./MainCategoryAdd.style";

const ColorList = [
  "#D0E8CB",
  "#AEDBA5",
  "#9BD88A",
  "#75BD62",
  "#649D55",
  "#58834D",
  "#507247",
];

const MainCategoryAdd = ({
  isShow,
  onClose,
  createCategoryHandler,
  tabType,
}) => {
  const [selectedColor, setSelectedColor] = useState(ColorList[0]);
  const [inputValue, setInputValue] = useState("");
  const onChangeInputValue = (e) => setInputValue(e.target.value);

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
              color: selectedColor,
              type: tabType,
            })
          }>
          카테고리 추가
        </ButtonV2>
      </S.FixedButtonContainer>
      <S.ColorPalette>
        {ColorList.map((color) => (
          <S.ColorDrop
            color={color}
            selectedColor={selectedColor}
            onClick={(e) => {
              setSelectedColor(color);
              e.stopPropagation();
            }}
            key={color}
          />
        ))}
      </S.ColorPalette>
    </S.Container>
  );
};

export default MainCategoryAdd;
