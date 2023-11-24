import Header from '../components/Header/Header';
import styled from "styled-components";
import GroupItem from '../components/Group/GroupItem';

const Group = () => {
  const isData = true;
  return (
    <GroupWrapper>
      <Header>모임</Header>
      {
        isData ?
          <GroupItemWrapper>
            <GroupItem />
            <GroupItem />
          </GroupItemWrapper>
          :
          <NoGroupWrapper>
            <div style={{color: "var(--color-dark-green)", fontSize: "28px", fontWeight: "700"}}>참여하신 모임이 없어요.</div>
            <div style={{color: "var(--color-secondary-green)", fontSize: "20px"}}>모임에 참여해서 기도제목을 공유해보세요!</div>
          </NoGroupWrapper>
      }
    </GroupWrapper>
  );
};
const GroupWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--color-light-green);
`;

const NoGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const GroupItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  padding-top: 80px;
  gap: 16px;
`;

export default Group;

