// import styled from "styled-components";
// import { usePray } from "../../../../hooks/usePray";
// import GreenCheckbox from "../../../GreenCheckbox/GreenCheckbox";

// const ICON_HEART_FILLED = "images/ic_filled_heart.svg";
// const ICON_HEART_EMPTY = "images/ic_empty_heart.svg";

// const MainCategory = ({
//   categoryId,
//   title,
//   color,
//   setSelectedPrayInfo,
//   prays,
//   setClickedCategoryData,
//   tabType,
//   categoryRef,
//   refIndex,
//   shareMode,
//   setCheckedList,
//   checkedList,
// }) => {
//   const { todayPray, cancelPray } = usePray(tabType);

//   const handleClick = (e, pray) => {
//     e.stopPropagation();
//     if (pray.isPrayedToday) {
//       cancelPray(pray.prayId);
//     } else {
//       todayPray(pray.prayId);
//     }
//   };

//   const titleClick = (pray) => {
//     if (shareMode) return;
//     const { name, categoryName, isPrayedToday, ...selectedPrayInfoSubset } =
//       pray;
//     setSelectedPrayInfo(selectedPrayInfoSubset);
//   };

//   const handleCheck = (e, prayId) => {
//     if (e.target.checked) {
//       setCheckedList([...checkedList, prayId]);
//     } else {
//       setCheckedList(checkedList.filter((id) => id !== prayId));
//     }
//   };

//   const handleCategoryTitleClick = () => {
//     console.log({ id: categoryId, color: color, name: title });
//     setClickedCategoryData({ id: categoryId, color: color, name: title });
//   };

//   return (
//     <CategoryContainer ref={(el) => (categoryRef.current[refIndex] = el)}>
//       <Title color={color}>
//         {title}
//         {!shareMode && (
//           <img
//             src="/images/ic_dot.svg"
//             alt="dot_icon"
//             onClick={handleCategoryTitleClick}
//           />
//         )}
//       </Title>
//       <ItemList>
//         {prays.map((pray) => (
//           <Item key={pray.prayId}>
//             {tabType === "shared" ? (
//               <ItemName selected={pray.isPrayedToday}>{pray.name}</ItemName>
//             ) : null}
//             <ItemText
//               selected={pray.isPrayedToday}
//               onClick={(e) => titleClick(pray)}>
//               {pray.content}
//             </ItemText>
//             {shareMode ? (
//               <GreenCheckbox
//                 id={pray.prayId}
//                 handler={(e) => handleCheck(e, pray.prayId)}
//               />
//             ) : (
//               <img
//                 src={pray.isPrayedToday ? ICON_HEART_FILLED : ICON_HEART_EMPTY}
//                 alt="heart_icon"
//                 onClick={(e) => handleClick(e, pray)}
//               />
//             )}
//           </Item>
//         ))}
//       </ItemList>
//     </CategoryContainer>
//   );
// };

// export default MainCategory;

// const CategoryContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   min-height: 100px;
//   border-radius: 16px;
//   box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);
// `;

// const Title = styled.div`
//   background-color: ${(props) => props.color};
//   border-radius: 16px 16px 0px 0px;
//   padding: 12px 16px;
//   color: ${(props) => (props.color === "#D0E8CB" ? "#A0A0A0" : "#FFFFFF")};
//   font-weight: 700;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const ItemList = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const ItemText = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   color: ${(props) => (props.selected ? "#49614380" : "#496143")};
//   font-size: 12px;
// `;

// const ItemName = styled.div`
//   width: 48px;
//   color: ${(props) => (props.selected ? "#75BD6280" : "#75BD62")};
//   font-size: 12px;
// `;

// const Item = styled.div`
//   padding: 16px;
//   position: relative;
//   display: flex;
//   align-items: center;
//   gap: 2px;

//   &:not(:last-child)::after {
//     content: "";
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     border-bottom: 1px solid #0000001a;
//   }
// `;
