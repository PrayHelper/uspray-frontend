import styled from "styled-components";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "../../../../lib/StrictModeDroppable";
import UserHeader from "../../../UserHeader";
import { useCategory } from "../../../../hooks/useCategory";
import { useAtom, useAtomValue } from "jotai";
import { mainModeAtom, mainTabAtom } from "../../../../pages/Main";
import Overlay from "../../../Overlay/Overlay";
import { useEffect } from "react";

const Hamburger = () => (
  <S.HamburgerContainer>
    <S.HamburgerRow />
    <S.HamburgerRow />
    <S.HamburgerRow />
  </S.HamburgerContainer>
);

const CategoryItem = ({ categoryItem, index }) => {
  return (
    <Draggable draggableId={categoryItem.id.toString()} index={index}>
      {(provided) => (
        <S.CategoryItemContainer
          bgColor={categoryItem.color}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <S.CategoryItemText>{categoryItem.name}</S.CategoryItemText>
          <Hamburger />
        </S.CategoryItemContainer>
      )}
    </Draggable>
  );
};

const browserPreventEvent = (event) => {
  window.history.pushState(null, "", window.location.href);
  event();
};

const MainChangeCategoryOrder = () => {
  const [mainMode, setMainMode] = useAtom(mainModeAtom);
  const mainTab = useAtomValue(mainTabAtom);

  const { categoryList, updateCategoryOrder } = useCategory(mainTab);

  const onDragEnd = ({ source, destination }) => {
    if (!source || !destination) return;

    const srcIndex = source.index;
    const destIndex = destination.index;

    // Do not replace itself
    if (srcIndex !== destIndex)
      updateCategoryOrder({
        srcIndex,
        destIndex,
      });
  };

  const isOn = mainMode === "CHANGE_CATEGORY_ORDER";

  // Override browser back button
  useEffect(() => {
    if (isOn)
      browserPreventEvent(() => {
        window.onpopstate = () => {
          setMainMode("DEFAULT");
        };
      });
    else window.onpopstate = null;
  }, [isOn, setMainMode]);

  return (
    <Overlay isOverlayOn={isOn}>
      <S.PageRoot>
        <UserHeader overlay setIsOverlayOn={() => setMainMode("DEFAULT")}>
          카테고리 순서 변경
        </UserHeader>
        {categoryList && (
          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="droppable">
              {(provided) => (
                <S.CategoryList
                  ref={provided.innerRef}
                  {...provided.droppableProps}>
                  {categoryList.map((categoryItem, index) => (
                    <CategoryItem
                      index={index}
                      key={categoryItem.id}
                      categoryItem={categoryItem}
                    />
                  ))}
                  {provided.placeholder}
                </S.CategoryList>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        )}
      </S.PageRoot>
    </Overlay>
  );
};

export default MainChangeCategoryOrder;

const S = {
  PageRoot: styled.div`
    z-index: 500;
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  CategoryList: styled.div`
    width: calc(100% - 32px);

    // flex-gap 미지원 관계로 selector 이용
    & > * {
      margin-top: 15px;
    }
  `,
  CategoryItemContainer: styled.div`
    background-color: ${({ bgColor }) => bgColor};

    color: white;
    font-weight: 700;
    font-size: 16px;
    border-radius: 8px;
    padding: 12px 16px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  CategoryItemText: styled.div``,
  HamburgerContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    justify-content: center;
    align-items: center;
  `,
  HamburgerRow: styled.div`
    background-color: #ffffff80;
    border-radius: 1px;
    height: 2px;
    width: 10px;
  `,
};
