import React from "react";
import styled from "styled-components";

const CheckIcon = () => (
  <img
    src="../images/ic_select_all.svg"
    alt="icon_selectAll"
    style={{ marginRight: "4px" }}
  />
);

const LockerHeader = ({
  isDataEmpty,
  isCheckedAtLeastOne,
  toggleAllItem,
  saveHandler,
  deleteHandler,
}) => {
  return (
    <S.HeaderWrapper>
      <S.Title>보관함</S.Title>
      {!isDataEmpty && (
        <S.Selectors>
          {!isCheckedAtLeastOne && (
            <div onClick={toggleAllItem}>
              <CheckIcon />
              전체 선택
            </div>
          )}
          {isCheckedAtLeastOne && (
            <>
              <div onClick={toggleAllItem}>전체 취소</div>
              <div onClick={saveHandler}>저장</div>
              <div onClick={deleteHandler}>삭제</div>
            </>
          )}
        </S.Selectors>
      )}
    </S.HeaderWrapper>
  );
};

export default LockerHeader;

const S = {
  HeaderWrapper: styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    box-shadow: 0 2px 8px var(--color-black-25);
    background-color: var(--color-white);
    z-index: 1;
    background-color: var(--color-white);
  `,
  Title: styled.div`
    font-weight: 700;
    font-size: 20px;
    margin-left: 16px;
  `,
  Selectors: styled.div`
    cursor: pointer;
    display: flex;
    gap: 16px;
    margin-right: 16px;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    color: var(--color-grey);
  `,
};

const StyledHeader = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0 2px 8px var(--color-black-25);
  background-color: var(--color-white);
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: var(--color-white);
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-left: 16px;
`;

const SelectGroup = styled.div`
  cursor: pointer;
  display: flex;
  gap: 16px;
  margin-right: 16px;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: var(--color-grey);
`;
