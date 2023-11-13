import styled from "styled-components";

const MainContent = () => {
  return (
    <MainContentWrapper>
      <div style={{display: "flex", marginTop: "8px"}}>

      </div>
    </MainContentWrapper>
  );
};

export default MainContent;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: relative;
  background-color: var(--color-white);
  border-radius: 32px 32px 0px 0px;
  padding: 16px;
  box-sizing: border-box;
`;
