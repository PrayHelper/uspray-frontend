import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 20px;
`;

// 특정 페이지에서 고정될 필요가 있음
const FixedStyledHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-top: 20px;

  position: fixed;
  top: 0;

  background-color: white;
`;

const BackButton = styled.img`
  position: absolute;
  margin-left: 15px;
`;

const RightButton = styled.div`
  position: absolute;
  right: 15px;
`;

const Title = styled.div`
  margin: 0 auto;
  color: #7bab6e;
  font-weight: bold;
`;

const UserHeader = ({ children, fixed, rightIcons }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  if (fixed)
    return (
      <FixedStyledHeader>
        <BackButton
          onClick={goBack}
          src="images/back_button.svg"
          alt="back_button"
        />
        <Title>{children}</Title>
        <RightButton>
          {rightIcons && rightIcons()}
        </RightButton>
      </FixedStyledHeader>
    );

  return (
    <StyledHeader>
      <BackButton
        onClick={goBack}
        src="images/back_button.svg"
        alt="back_button"
      />
      <Title>{children}</Title>
      <RightButton>
        {rightIcons && rightIcons()}
      </RightButton>
    </StyledHeader>
  );
};

export default UserHeader;