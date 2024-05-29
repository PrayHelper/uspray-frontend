import styled from "styled-components";

const LockerItem = ({ isChecked, name, dDayLabel, content, onClick }) => (
  <S.ItemContainer onClick={onClick} isChecked={isChecked}>
    <S.ItemTopArea>
      <S.ItemName>{name}</S.ItemName>
      <S.DDayLabelContainer>{dDayLabel}</S.DDayLabelContainer>
    </S.ItemTopArea>
    <S.ItemBottomArea>{content}</S.ItemBottomArea>
  </S.ItemContainer>
);

const LockerPrayerList = ({ lockerPrayerList }) => {
  return (
    <S.ListContainer>
      {lockerPrayerList.map((lockerPrayerItem) => (
        <LockerItem {...lockerPrayerItem} />
      ))}
    </S.ListContainer>
  );
};

export default LockerPrayerList;

const S = {
  ListContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ItemContainer: styled.div`
    cursor: pointer;
    padding: 16px;
    background-color: var(
      ${({ isChecked }) => (isChecked ? "--color-white-75" : "--color-white")}
    );
    box-shadow: 0px 2px 8px var(--color-locker-content-shadow);
    border-radius: 16px;
    margin: 12px 24px 0px 24px;
    outline: ${({ isChecked }) =>
      isChecked ? `2px solid var(--color-dark-green)` : `var(--color-white)`};
    transition: all 0.3s ease-in-out;
    &:active {
      transition: all 0.2s ease-in-out;
      filter: ${({ disabled }) =>
        disabled ? "brightness(1)" : "brightness(0.9)"};
      scale: ${({ disabled }) => (disabled ? "1" : "0.98")};
    }
  `,
  ItemTopArea: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 5px;
  `,
  ItemName: styled.div`
    color: var(--color-dark-green);
    font-size: 12px;
    /* line-height: 17px; */
  `,
  DDayLabelContainer: styled.div`
    color: var(--color-grey);
    font-size: 12px;
  `,
  ItemBottomArea: styled.div`
    color: var(--color-dark-grey);
    font-size: 12px;
    line-height: 17px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `,
};
