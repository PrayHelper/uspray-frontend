import styled from 'styled-components';
import MainContent from '../components/Main/MainContent';
import Button, { ButtonSize } from "../components/Button/Button";
import { useState } from 'react';


const Main = () => {
  const [tab, setTab] = useState('내가 쓴');
  const [bgColor, setBgColor] = useState('#7BAB6E');
  const [inputValue, setInputValue] = useState('');
  const [showCategorySetting, setShowCategorySetting] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#D0E8CB');
  const [categories, setCategories] = useState([]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    setBgColor(newTab === '내가 쓴' ? '#7BAB6E' : '#D0E8CB');
  };

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

  const TabList = ['내가 쓴', '공유 받은'];
  const ColorList = ["#D0E8CB", "#AEDBA5", "#9BD88A", "#75BD62", "#649D55", "#58834D", "#507247"];

  return (
    <MainWrapper style={{ backgroundColor: bgColor }}>
      <TopContainer>
        <TopBox>
          <TabContainer>
          {TabList.map((tabItem) => (
            <Tab 
              active={tab === tabItem}
              onClick={() => handleTabChange(tabItem)}
              key={tabItem}
            >
              {tabItem}
          </Tab>
          ))}
          </TabContainer>
          <AlarmIcon src={tab === '공유 받은' ? "images/ic_alarm_green.svg" : "images/ic_alarm.svg"} alt="alarm_icon" />
        </TopBox>
        <FlexContainer>
        {tab === '내가 쓴' ? 
          <Input type="text" placeholder="기도제목을 입력해주세요." style={{width: "100%"}} /> : 
          <MoveToLockerButton>보관함에 3개의 기도제목이 있어요</MoveToLockerButton>
        }
        </FlexContainer>
      </TopContainer>
      <MainContent categories={categories} setCategories={setCategories} setShowCategorySetting={setShowCategorySetting}/>
      {showCategorySetting && (
        <CategorySetting  onClick={() => setShowCategorySetting(false)}>
          <Input type="text" value={inputValue} placeholder="카테고리를 입력해주세요" onChange={handleInputChange} onClick={handleInnerClick}/>
          <FixedButtonContainer onClick={handleInnerClick}>
            <Button buttonSize={ButtonSize.LARGE} handler={addCategory}>카테고리 추가</Button>
          </FixedButtonContainer>
          <ColorPalette>
          {ColorList.map((color) => (
            <ColorDrop color={color} selectedColor={selectedColor} onClick={(event) => {setSelectedColor(color); event.stopPropagation();}} key={color}/>
          ))}
          </ColorPalette>
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
  background-color: #7BAB6E;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 16px;
  gap: 16px;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const AlarmIcon = styled.img``;

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const Tab = styled.div`
  font-size: 24px;
  color: ${props => props.active ? (props.children === '내가 쓴' ? '#FFFFFF' : '#606060') : '#60606080'};
  cursor: pointer;
  border-bottom: ${props => props.active ? (props.children === '내가 쓴' ? '2px solid #FFFFFF' : '2px solid #606060') : 'none'};
`;

const Input = styled.input`
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
  font-weight: 500;
  font-size: 16px;
`;

const MoveToLockerButton = styled.div`
  width: 100%;
  padding: 14px 16px;
  background-color: #7BAB6E;
  color: #FFFFFF;
  border-radius: 16px;
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

const ColorPalette = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  margin-top: 8px;
`;

const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 64px;
  width: calc(100% - 32px);
  cursor: pointer;
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
