import Header from '../components/Header/Header';
import styled from "styled-components";
import GroupItem from '../components/Group/GroupItem';
import { useNavigate } from 'react-router-dom';
import { useGroup } from '../hooks/useGroup';
import { useState } from 'react';
import GroupDetail from '../components/Group/GroupDetail/GroupDetail';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Group = () => {
  const { groupList } = useGroup();
  const [group, setGroup] = useState(null);
  const [showGroupDetail, setShowGroupDetail] = useState(false);
  const navigate = useNavigate();

  const { joinGroup } = useGroup();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const groupIdData = query.getAll('id');

  useEffect(() => {
    if (groupIdData.length === 1)
    {
      const groupId = window.atob(groupIdData[0]);
      joinGroup(parseInt(groupId));
    }
  }, []);

  useEffect(() => {
    if (group !== null)
      setGroup(prev => {
        const foundGroup = groupList.find((group) => group.id === prev.id) || null;
        if (foundGroup === null)
          setShowGroupDetail(false);
        return foundGroup;
      })
  }, [groupList]);
  return (
    <>
    {
      showGroupDetail ?
      <GroupDetail group={group} setShowGroupDetail={setShowGroupDetail}/>
      :
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
                      setGroup={setGroup}
                      setShowGroupDetail={setShowGroupDetail}
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
    }
    </>
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
