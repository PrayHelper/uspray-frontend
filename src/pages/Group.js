import Header from '../components/Header/Header';
import styled from "styled-components";
import GroupItem from '../components/Group/GroupItem';
import { useNavigate } from 'react-router-dom';

const Group = () => {
  const isData = true;
  const navigate = useNavigate();
  const groupList = [
    {
      id: 0,
      name: "string",
      lastPrayContent: "string",
      memberCount: 0,
      prayCount: 0,
      updatedAt: "2023-11-24T10:06:06.136Z"
    }
  ];
  return (
    <GroupWrapper>
      <Header>모임</Header>
      {
        groupList.length !== 0 ?
          <GroupItemWrapper>
            {
              groupList.map((group) => {
                return (
                  <GroupItem
                    key={group.id}
                    group={group}
                  />
                );
              })
            }
          </GroupItemWrapper>
          :
          <NoGroupWrapper>
            <div style={{color: "var(--color-dark-green)", fontSize: "28px", fontWeight: "700"}}>참여하신 모임이 없어요.</div>
            <div style={{color: "var(--color-secondary-green)", fontSize: "20px"}}>모임에 참여해서 기도제목을 공유해보세요!</div>
          </NoGroupWrapper>
      }
      <CreateBtn src="images/ic_group_create.svg" alt="group_create_icon" onClick={() => navigate('/createGroup')} />
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
  padding: 80px 16px;
  gap: 16px;
  background-color: var(--color-light-green);
`;

const CreateBtn = styled.img`
  position: fixed;
  bottom: 80px;
  right: 20px;
`

export default Group;
