import styled from 'styled-components';
import MainContent from '../components/Main/MainContent';

const Main = () => {
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
        <div style={{display: "flex", padding: "16px"}}>
          <div>기도제목을 입력해주세요.</div>
        </div>
      </div>
      <MainContent />
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
