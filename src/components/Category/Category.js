import { useState } from "react";
import styled from "styled-components";

const ICON_HEART_FILLED = "images/ic_filled_heart.svg";
const ICON_HEART_EMPTY = "images/ic_empty_heart.svg";

const Category = ({ title, color, setSelectedTitleIndex }) => {
  const [selected, setSelected] = useState([]);
  const titles = ["기도제목1", "기도제목2", "기도제목3"];

  const handleClick = (e, index) => {
    e.stopPropagation();
    setSelected((prev) => {
      const newSelected = [...prev];
      newSelected[index] = !newSelected[index];
      return newSelected;
    });
  };

  const titleClick = (e, index) => {
    setSelectedTitleIndex(index);
  };

  return (
    <CategoryContainer>
      <Title color={color}>{title}</Title>
      <ItemList>
        {titles.map((title, index) => (
          <Item key={index}>
            <ItemText
              selected={selected[index]}
              onClick={(e) => titleClick(e, index)}
            >
              {title}
            </ItemText>
            <img
              src={selected[index] ? ICON_HEART_FILLED : ICON_HEART_EMPTY}
              alt="heart_icon"
              onClick={(e) => handleClick(e, index)}
            />
          </Item>
        ))}
      </ItemList>
    </CategoryContainer>
  );
};

export default Category;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100px;
  border-radius: 16px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);
`;

const Title = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 16px 16px 0px 0px;
  padding: 12px 16px;
  color: #ffffff;
  font-weight: 700;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemText = styled.div`
  flex: 1 1 0%;
  color: ${(props) => (props.selected ? "#49614380" : "#496143")};
  font-size: 12px;
`;

const Item = styled.div`
  padding: 16px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid #0000001a;
  }
`;
