import styled from "styled-components";

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  z-index: 1;
`;

export const HeaderCont = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-black);
  font-size: 20px;
  font-weight: bold;
  padding: 18px 16px 19px 16px;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-secondary-grey);
`;

export const BtnWrapper = styled.div`
  display: flex;
  text-align: center;
  font-size: 14px;
`;

export const MyBtn = styled.div`
  flex-grow: 1;
  padding: 14px;
  transition: all 0.3s;
  background-color: ${(props) =>
    props.sortBy === "date" ? `var(--color-green)` : `var(--color-white)`};
  color: ${(props) =>
    props.sortBy === "date"
      ? `var(--color-white)`
      : `var(--color-secondary-grey)`};
  cursor: pointer;
`;

export const SharedBtn = styled.div`
  flex-grow: 1;
  padding: 14px;
  transition: all 0.3s;
  background-color: ${(props) =>
    props.sortBy === "date" ? `var(--color-white)` : `var(--color-green)`};
  color: ${(props) =>
    props.sortBy === "date"
      ? `var(--color-secondary-grey)`
      : `var(--color-white)`};
  cursor: pointer;
`;
