import React from 'react';
import styled from 'styled-components';

const SearchList = ({memberList, leaderId, setLeaderId}) => {

  return (
    <Wrapper>
      {memberList.map((member, index) => {
        return (
          <NameDiv
            key={index}
            onClick={() => setLeaderId((prev) => {
              if (prev)
                return null;
              else
                return member.id;
            })} 
            isLeader={leaderId === member.id}
          >
            {member.name}
            {`(${member.userId})`}
          </NameDiv>
        )
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  overflow: auto;
  margin-bottom: 100px;
`
const NameDiv = styled.div`
  padding: 12px 0;
  color: ${props => props.isLeader ? "var(--color-green)" : "var(--color-grey)"};
  font-size: 16px;
`

export default SearchList;