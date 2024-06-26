import styled from "styled-components";

export const S = {
  CategoryContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100px;
    border-radius: 16px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);
  `,
  Title: styled.div`
    padding: 100px;
    background-color: ${(props) => props.color};
    border-radius: 16px 16px 0px 0px;
    padding: 12px 16px;
    color: ${(props) => (props.color === "#D0E8CB" ? "#A0A0A0" : "#FFFFFF")};
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  ItemList: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ItemText: styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    color: ${(props) => (props.selected ? "#49614380" : "#496143")};
    font-size: 12px;
  `,
  ItemName: styled.div`
    width: 48px;
    color: ${(props) => (props.selected ? "#75BD6280" : "#75BD62")};
    font-size: 12px;
  `,
  Item: styled.div`
    padding: 16px;
    position: relative;
    display: flex;
    align-items: center;
    gap: 2px;

    &:not(:last-child)::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-bottom: 1px solid #0000001a;
    }
  `,
  // 카테고리 박스
  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 8px 16px 124px;
  `,
};
