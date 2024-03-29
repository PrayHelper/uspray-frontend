import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { ToastTheme } from "../../Toast/Toast";
import useToast from "../../../hooks/useToast";
import BlackScreen from "../../BlackScreen/index";
import Modal from "../../Modal/Modal";
import { useGroupPray } from "../../../hooks/useGroupPray";

const GroupPrayItem = ({
  groupId,
  pray,
  categoryList,
  firstCategoryIndex,
  setTab,
  tab,
  scrapPrayId,
  setScrapPrayId,
  setCategoryInputValue,
  setShowSubModal,
  showSubModal,
  setScrapPrayInfo,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast({});
  const [heart, setHeart] = useState(pray.heart);
  const [scrap, setScrap] = useState(pray.scrap);
  const { deleteGroupPray, likeGroupPray } = useGroupPray(groupId);

  useEffect(() => {
    if (scrapPrayId === pray.groupPrayId) {
      setScrap(true);
      setScrapPrayId(null);
      setScrapPrayInfo(null);
    }
  }, [scrapPrayId]);

  useEffect(() => {
    if (tab === "shared") {
      setCategoryInputValue(firstCategoryIndex);
      setShowSubModal(true);
    }
  }, [categoryList]);

  useEffect(() => {
    if (!showSubModal) {
      setTab("personal");
    }
  }, [showSubModal]);

  const onClickScrap = (groupPrayId) => {
    if (groupPrayId === pray.groupPrayId) {
      setTab("shared");
      setScrapPrayInfo(pray);
    }
  };

  return (
    <Wrapper>
      <BlackScreen isModalOn={showModal} onClick={() => setShowModal(false)} />
      {showModal && (
        <>
          <Modal
            isModalOn={showModal}
            iconSrc={"images/ic_group_pray_delete.svg"}
            iconAlt={"group_pray_delete"}
            mainContent={"정말 삭제하시겠습니까?"}
            subContent={"해당 모임의 기도 목록에서 지워집니다."}
            btnContent={"삭제"}
            btnContent2={"취소"}
            onClickBtn={() => {
              deleteGroupPray(pray.groupPrayId);
              setShowModal(false);
              showToast({
                message: "모임에서 기도제목을 삭제했어요.",
                theme: ToastTheme.SUCCESS,
              });
            }}
            onClickBtn2={() => setShowModal(false)}
            modalTheme={2}
          />
        </>
      )}

      <PrayItem>
        <PrayContent onClick={() => pray.owner && setShowModal(true)}>
          <div style={{ fontSize: "14px", color: "var(--color-green)" }}>
            {pray.authorName}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--color-group-pray-content)",
            }}
          >
            {pray.content}
          </div>
        </PrayContent>
        {!pray.owner && (
          <PrayButton>
            {heart ? (
              <img
                src="images/ic_group_heart_filled.svg"
                alt="filled_heart_icon"
              />
            ) : (
              <img
                onClick={() => {
                  setHeart(true);
                  likeGroupPray(pray.groupPrayId);
                }}
                src="images/ic_group_heart.svg"
                alt="heart_icon"
              />
            )}
            {scrap ? (
              <img
                src="images/ic_group_bookmark_filled.svg"
                alt="filled_bookmark_icon"
              />
            ) : (
              <img
                onClick={() => {
                  onClickScrap(pray.groupPrayId);
                }}
                src="images/ic_group_bookmark.svg"
                alt="bookmark_icon"
              />
            )}
          </PrayButton>
        )}
      </PrayItem>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #0000001a;
`;

const PrayContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  word-break: break-all;
`;

const PrayButton = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  gap: 8px;
  border-radius: 16px;
  height: fit-content;
  background-color: var(--color-group-pray-button-background);
`;

const PrayItem = styled.div`
  padding: 12px 16px;
  display: flex;
  gap: 40px;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
`;

export default GroupPrayItem;
