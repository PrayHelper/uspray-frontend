import styled from "styled-components";
import ButtonV2, { ButtonTheme } from "../../components/ButtonV2/ButtonV2";
import { createPortal } from "react-dom";

const COLORS = [
  "#D0E8CB",
  "#AEDBA5",
  "#9BD88A",
  "#75BD62",
  "#649D55",
  "#58834D",
  "#507247",
];

const LABEL_MAP = {
  DELETE: "카테고리 삭제",
  CREATE: "카테고리 추가",
  MODIFY: "카테고리 수정",
};

const CategoryInputModal = ({
  isShow,
  textInputValue,
  onChangeTextInputValue,
  selectedColor,
  selectColor,
  closeHandler,
  onClickBottomButton,
  onClickSecondaryButton,
  mode, // "CREATE" | "EDIT"
}) => {
  console.log({ selectedColor });

  return createPortal(
    <>
      <S.BlackBg isShow={isShow} onClick={closeHandler} />
      <S.Outer isShow={isShow}>
        <S.Inner>
          <S.TextAndColorContainer>
            <S.CategoryInput
              isShow={isShow}
              type="text"
              value={textInputValue}
              placeholder={"카테고리를 입력해주세요"}
              onChange={onChangeTextInputValue}
            />
            <S.ColorPalette isShow={isShow}>
              {COLORS.map((color) => (
                <S.ColorDrop
                  key={color}
                  color={color}
                  isSelected={selectedColor === color}
                  onClick={() => {
                    selectColor(color);
                  }}
                />
              ))}
            </S.ColorPalette>
          </S.TextAndColorContainer>
          <S.FixedButtonContainer isShow={isShow}>
            {mode === "CREATE" ? (
              <ButtonV2
                buttonTheme={ButtonTheme.FILLED}
                disabled={!textInputValue}
                handler={onClickBottomButton}>
                {LABEL_MAP["CREATE"]}
              </ButtonV2>
            ) : (
              <>
                <ButtonV2
                  buttonTheme={ButtonTheme.OUTLINED}
                  handler={onClickSecondaryButton}>
                  {LABEL_MAP["DELETE"]}
                </ButtonV2>
                <ButtonV2
                  buttonTheme={ButtonTheme.FILLED}
                  disabled={!textInputValue}
                  handler={onClickBottomButton}>
                  {LABEL_MAP["MODIFY"]}
                </ButtonV2>
              </>
            )}
          </S.FixedButtonContainer>
        </S.Inner>
      </S.Outer>
    </>,
    document.getElementById("category-input-modal")
  );
};

export default CategoryInputModal;

const S = {
  BlackBg: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.7);

    opacity: ${({ isShow }) => (isShow ? 1 : 0)};
    pointer-events: ${({ isShow }) => (isShow ? "auto" : "none")};
    transition: all 0.2s ease-in-out;
    z-index: 201;
  `,
  Outer: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;

    opacity: ${({ isShow }) => (isShow ? 1 : 0)};
    z-index: 202;
    pointer-events: none;
  `,
  Inner: styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 16px;
  `,
  TextAndColorContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  CategoryInput: styled.input`
    width: calc(100%-16px);
    height: 51px;
    border-radius: 16px;
    padding: 0px 16px;
    ::placeholder {
      color: var(--color-secondary-green);
      font-weight: 400;
    }
    outline: none;
    border: 0;
    color: var(--color-green);
    font-weight: 400;
    letter-spacing: -0.64px;
    font-size: 16px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);

    pointer-events: ${({ isShow }) => (isShow ? "auto" : "none")};
  `,
  ColorPalette: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    margin-top: 8px;

    pointer-events: ${({ isShow }) => (isShow ? "auto" : "none")};
  `,
  ColorDrop: styled.div`
    width: 32px;
    height: 32px;
    background-color: ${({ color }) => color};
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
    transform: rotate(45deg);

    ::after {
      content: "";
      position: absolute;
      top: 115%;
      left: 115%;
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      display: ${({ isSelected }) => (isSelected ? "block" : "none")};
    }
  `,
  FixedButtonContainer: styled.div`
    position: fixed;
    bottom: 64px;
    width: calc(100% - 32px);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 16px;

    pointer-events: ${({ isShow }) => (isShow ? "auto" : "none")};
  `,
};
