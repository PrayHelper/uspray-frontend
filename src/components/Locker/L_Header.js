import React, { useState } from "react";
import styled from "styled-components";

const LockerHeader = (props) => {
  return (
    <div style={{ width: "100%" }}>
      <StyledHeader>
        <Title>보관함</Title>
        {!props.isEmptyData && (
          <SelectGroup>
            {!props.isClicked && (
              <div onClick={props.onClickSelectAll}>
                <img
                  src="../images/ic_select_all.svg"
                  alt="icon_selectAll"
                  style={{ marginRight: "4px" }}
                />
                전체 선택
              </div>
            )}
            {props.isClicked && (
              <>
                <div onClick={props.onClickSelectAll}>전체 취소</div>
                <div onClick={props.saveSharedList}>저장</div>
                <div onClick={props.deleteSharedList}>삭제</div>
              </>
            )}
          </SelectGroup>
        )}
      </StyledHeader>
    </div>
  );
};

export default LockerHeader;

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
