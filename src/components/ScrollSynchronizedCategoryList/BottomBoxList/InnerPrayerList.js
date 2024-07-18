import styled from "styled-components";
import GreenCheckbox from "../../GreenCheckbox/GreenCheckbox";
import usePrayerBottomModal from "../../../overlays/PrayerBottomModal/usePrayerBottomModal";
import { useContext } from "react";
import { PrayerListDataContext } from "../ScrollSynchronizedCategoryList";
import { usePray } from "../../../hooks/usePray";
import { useSelectionModal } from "../../../overlays/SelectionModal/useSelectionModal";

const Toggle = ({
  type, // "CHECKBOX" | "HEART"
  isOn,
  toggleHandler,
}) => {
  const onClick = (e) => {
    e.stopPropagation();
    toggleHandler();
  };

  if (type === "CHECKBOX")
    return <GreenCheckbox checked={isOn} handler={onClick} />;

  return <S.HeartToggleView isOn={isOn} onClick={onClick} />;
};

const Item = ({ item }) => {
  const { name, isPrayedToday, content, prayId } = item;
  const { isSharedPrayers: isSharedPrayer, isSelectable } = useContext(
    PrayerListDataContext
  );

  const { isSelectedMap, toggleById } = useSelectionModal();

  const tab = isSharedPrayer ? "shared" : "personal";

  const { todayPray, cancelPray } = usePray(tab);

  const { selectPrayerInfo } = usePrayerBottomModal();

  const toggleHandler = async () => {
    if (isSelectable) {
      toggleById(prayId);
    } else {
      if (!isPrayedToday) todayPray(prayId);
      else cancelPray(prayId);
    }
  };

  const onClick = () => {
    if (isSelectable) toggleById(prayId);
    else selectPrayerInfo({ ...item, isShared: isSharedPrayer });
  };

  return (
    <S.Item onClick={onClick}>
      {isSharedPrayer && (
        <S.ItemName selected={isPrayedToday}>{name}</S.ItemName>
      )}
      <S.ItemContent selected={isPrayedToday}>{content}</S.ItemContent>
      <Toggle
        isOn={isSelectable ? isSelectedMap[prayId] : isPrayedToday}
        isShared={isSharedPrayer}
        type={isSelectable ? "CHECKBOX" : "HEART"}
        toggleHandler={toggleHandler}
      />
    </S.Item>
  );
};

const InnerPrayerList = ({ innerPrayers, isShared }) => {
  return (
    <S.ListContainer>
      {innerPrayers.map((item) => (
        <Item key={item.prayId} isShared={isShared} item={item} />
      ))}
    </S.ListContainer>
  );
};

export default InnerPrayerList;

const S = {
  ListContainer: styled.div`
    display: flex;
    flex-direction: column;
    min-height: 50px;
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
    color: ${({ selected }) => (selected ? "#49614380" : "#496143")};
    font-size: 12px;
    transition: all 0.2s;
  `,
  ItemName: styled.div`
    width: 48px;
    color: ${({ selected }) => (selected ? "#75BD6280" : "#75BD62")};
    font-size: 12px;
    transition: all 0.2s;
  `,
  HeartToggleView: styled.div`
    width: 24px;
    height: 24px;

    background-image: ${({ isOn }) =>
      isOn
        ? "url('images/ic_filled_heart.svg')"
        : "url('images/ic_empty_heart.svg')"};

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    transition: all 0.2s;
  `,
};
