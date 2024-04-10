import styled from "styled-components";
import { useScrollSections } from "../../../lib/react-scroll-section";
import { useMainStates } from "../../../pages/Main";

const TopHorizontalCategories = () => {
  const sections = useScrollSections();

  const getSectionById = (id) =>
    sections.find((section) => section.id === String(id));

  const { setActiveOverlays, categoryList } = useMainStates();

  const activateCategorySetting = () =>
    setActiveOverlays(["CATEGORY_CREATE_MODAL"]);

  return (
    <S.TopWrapper>
      <S.ListContainer>
        {categoryList.map((category) => (
          <S.CategoryBox
            selected={getSectionById(category.id)?.selected}
            onClick={() => {
              getSectionById(category.id)?.onClick();
            }}
            key={category.id}
            color={category.color}>
            {category.name}
          </S.CategoryBox>
        ))}
        <S.AddButton onClick={activateCategorySetting}>
          추가
          <img src="images/ic_add.svg" alt="add_icon" />
        </S.AddButton>
      </S.ListContainer>
    </S.TopWrapper>
  );
};

export default TopHorizontalCategories;

const S = {
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
  // 카테고리 덮개
  TopWrapper: styled.div`
    display: flex;
    padding: 24px 16px 16px;
    position: sticky;
    top: 0;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 24px;
    z-index: ${(props) => (props.shareMode ? 201 : 50)};
    backdrop-filter: blur(12px);
    border: ${(props) =>
      props.shareMode ? "1px solid rgba(0, 0, 0, 0.1)" : "none"};
    box-shadow: ${(props) =>
      props.shareMode ? "0px 0px 4px rgba(0, 0, 0, 0.1)" : "none"};
  `,
  CategoryBox: styled.div`
    background-color: ${(props) => (props.selected ? props.color : "#EEEEEE")};
    color: ${(props) =>
      props.selected
        ? props.color === "#D0E8CB"
          ? "#A0A0A0"
          : "#FFFFFF"
        : "#CECECE"};
    border-radius: 24px;
    padding: 16px;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    transition: all 0.2s ease-in-out;
  `,
  AddButton: styled.button`
    display: flex;
    gap: 4px;
    align-items: center;
    background-color: transparent;
    border: 1px solid #75bd62;
    border-radius: 24px;
    padding: 16px;
    color: #75bd62;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
  `,
};
