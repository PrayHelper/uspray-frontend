import React from 'react';
import styled from 'styled-components';

const SearchList = ({data, searchName, leader, setLeader}) => {
  const filterName = data.filter((name) => {
    if (leader !== "")
      return name.includes(leader);
    return name.includes(searchName);
  });

  return (
    <Wrapper>
      {filterName.map((name, index) => {
        return (
          <NameDiv
            key={index}
            onClick={() => setLeader((prev) => {
              if (prev)
                return "";
              else
                return name;
            })} 
            isLeader={leader === name}
          >
            {name}
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