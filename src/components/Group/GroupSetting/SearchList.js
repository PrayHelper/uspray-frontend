import React from 'react';
import styled from 'styled-components';

const SearchList = ({memberList, memberId, setMemberId}) => {

  return (
    <Wrapper>
      {memberList.map((member, index) => {
        return (
          <NameDiv
            key={index}
            onClick={() => setMemberId((prev) => {
              if (prev)
                return null;
              else
                return member.id;
            })} 
            isSelected={memberId === member.id}
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
  color: ${props => props.isSelected ? "var(--color-green)" : "var(--color-grey)"};
  font-size: 16px;
`

export default SearchList;