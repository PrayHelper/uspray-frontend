import styled from "styled-components";
import GreenCheckbox from "../../GreenCheckbox/GreenCheckbox";
import usePrayerBottomModal from "../../../overlays/PrayerBottomModal/usePrayerBottomModal";

const Username = ({ selected, name }) => (
  <S.ItemName selected={selected}>{name}</S.ItemName>
);

const ItemRight = ({ isShared, isPrayedToday, checked }) => {
  if (isShared) return <GreenCheckbox checked={checked} handler={() => {}} />;

  return (
    <img
      src={
        isPrayedToday
          ? "images/ic_filled_heart.svg"
          : "images/ic_empty_heart.svg"
      }
      alt="heart_icon"
      onClick={() => {}}
    />
  );
};

const Item = ({ prayer, isShared }) => {
  const { name, isPrayedToday, content } = prayer;

  const { selectPrayerInfo } = usePrayerBottomModal();

  return (
    <S.Item onClick={() => selectPrayerInfo(prayer)}>
      {isShared && <Username selected={isPrayedToday} name={name} />}
      <S.ItemContent>{content}</S.ItemContent>
      <ItemRight
        checked={false}
        isPrayedToday={isPrayedToday}
        isShared={isShared}
      />
    </S.Item>
  );
};

const InnerPrayerList = ({ prayers, isShared }) => {
  return (
    <S.ListContainer>
      {prayers.map((prayer) => (
        <Item key={prayer.prayId} isShared={isShared} prayer={prayer} />
      ))}
    </S.ListContainer>
  );
};

export default InnerPrayerList;

const S = {
  ListContainer: styled.div`
    display: flex;
    flex-direction: column;
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
  ItemContent: styled.div`
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
};
