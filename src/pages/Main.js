import styled from 'styled-components';
import MainContent from '../components/Main/MainContent';
import Button, { ButtonSize } from "../components/Button/Button";
import { useState } from 'react';


const Main = () => {
  const [inputValue, setInputValue] = useState('');
  const [showCategorySetting, setShowCategorySetting] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#D0E8CB');
  const [categories, setCategories] = useState([]);


  const addCategory = () => {
    if(inputValue !== '') {
      setCategories([...categories, { name: inputValue, color: selectedColor }]);
      setInputValue('');
      setSelectedColor('#D0E8CB');
      setShowCategorySetting(false);
    }
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  


  const handleInnerClick = (e) => {
    e.stopPropagation();
  };


  return (
    <MainWrapper>
      <div style={{display: "flex", flexDirection: "column",boxSizing: "border-box", padding: "16px", gap: "16px"}}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <div style={{display: "flex", flexDirection: "row", fontSize: "24px", gap: "16px"}}>
            <div style={{color: "#FFFFFF", borderBottom: "1px solid #FFFFFF"}}>내가 쓴</div>
            <div style={{color: "#FFFFFF80"}}>공유 받은</div>
          </div>
          <img src="images/ic_alarm.svg" alt="alarm_icon" />
        </div>
        <div style={{display: "flex"}}>
          <Input type="text" placeholder="기도제목을 입력해주세요." style={{width: "100%"}} />
        </div>
      </div>
      <MainContent categories={categories} setCategories={setCategories} setShowCategorySetting={setShowCategorySetting}/>

      {showCategorySetting && (
        <CategorySetting  onClick={() => setShowCategorySetting(false)}>
          <Input type="text" value={inputValue} placeholder="카테고리를 입력해주세요" onChange={handleInputChange} onClick={handleInnerClick}/>
          <div style={{position: "fixed", bottom: "64px", width: "calc(100% - 32px)"}} onClick={handleInnerClick}>
            <Button buttonSize={ButtonSize.LARGE} handler={addCategory}>카테고리 추가</Button>
          </div>
          <div style={{display: "flex", justifyContent: "space-between", padding: "16px", marginTop: "8px"}}>
            <ColorDrop color={"#D0E8CB"} selectedColor={selectedColor} onClick={(event) => {setSelectedColor("#D0E8CB"); event.stopPropagation();}}/>
            <ColorDrop color={"#AEDBA5"} selectedColor={selectedColor} onClick={(event) => {setSelectedColor("#AEDBA5"); event.stopPropagation();}}/>
            <ColorDrop color={"#9BD88A"} selectedColor={selectedColor} onClick={(event) => {setSelectedColor("#9BD88A"); event.stopPropagation();}}/>
            <ColorDrop color={"#75BD62"} selectedColor={selectedColor} onClick={(event) => {setSelectedColor("#75BD62"); event.stopPropagation();}}/>
            <ColorDrop color={"#649D55"} selectedColor={selectedColor} onClick={(event) => {setSelectedColor("#649D55"); event.stopPropagation();}}/>
            <ColorDrop color={"#58834D"} selectedColor={selectedColor} onClick={(event) => {setSelectedColor("#58834D"); event.stopPropagation();}}/>
            <ColorDrop color={"#507247"} selectedColor={selectedColor} onClick={(event) => {setSelectedColor("#507247"); event.stopPropagation();}}/>
          </div>
        </CategorySetting>
      )}

    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: relative;
  background-color: var(--color-dark-green);
`;

const Input = styled.input`
  width: calc(100%-16px);
  height: 55px;
  border-radius: 16px;
  padding: 0px 16px;
  ::placeholder {
    color: var(--color-secondary-green);
    font-weight: 400;
  }
  outline: none;
  border: 0;
  color: var(--color-green);
  font-weight: 500;
`;


const CategorySetting = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
`;

const ColorDrop = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.color};
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
    display: ${(props) => (props.color === props.selectedColor ? "block" : "none")};
`;
