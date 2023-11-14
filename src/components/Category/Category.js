import { useState } from "react";
import styled from "styled-components";

const Category = ({title, color}) => {
  const [selected, setSelected] = useState([]);
  const titles = ['기도제목1', '기도제목2', '기도제목3'];

  const handleClick = (e, index) => {
    e.stopPropagation();
    setSelected(prev => {
      const newSelected = [...prev];
      newSelected[index] = !newSelected[index];
      return newSelected;
    });
  };


  return (
    <div style={{display: "flex", flexDirection: "column", width: "100%", minHeight: "100px",borderRadius: "16px", boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.25)"}}>
      <div style={{backgroundColor: `${color}`, borderRadius: "16px 16px 0px 0px", padding: "12px 16px", color: "#FFFFFF", fontWeight: "700"}}>{title}</div>
      <div style={{display: "flex", flexDirection: "column", }}>
      {titles.map((title, index) => (
        <Item key={index} >
          <div style={{flex: "1 1 0%", color: selected[index] ? "#49614380" : "#496143", fontSize: "12px"}}>{title}</div>
          <img src={selected[index] ? "images/ic_filled_heart.svg" : "images/ic_empty_heart.svg"} alt="heart_icon" onClick={(e) => handleClick(e, index)}/>
        </Item>
      ))}
      </div>
    </div>
  );
};

export default Category;

const Item = styled.div`
  padding: 16px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid #0000001A;
  }
`;