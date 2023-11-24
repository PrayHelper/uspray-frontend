import React from 'react';
import styled from 'styled-components';

const Search = ({topText, setSearchName}) => {
  return (
    <Wrapper>
      <ContentWrapper>
        <div style={{fontSize: "16px", color: "var(--color-green)"}}>
          {topText}
        </div>
        <SearchBar>
          <Input
            placeholder='이름을 검색하세요'
            onChange={(e) => setSearchName(e.target.value)}
          />
          <img
            src='images/ic_group_search.svg'
            alt='group_search'
          />
        </SearchBar>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #0000001A;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px
`

const Input = styled.input`
  background-color: transparent;
  border: 0px;
  font-size: 16px;
  width: 100%;
  &:focus {
    outline: none;
  };
  ::placeholder {
    color: var(--color-grey-50);
  }
`

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  padding: 9px 12px;
  background-color: var(--color-light-grey);
`

export default Search;