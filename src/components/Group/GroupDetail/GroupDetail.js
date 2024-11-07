import React, { useEffect, useRef } from "react";
import UserHeader from "../../UserHeader";
import styled from "styled-components";
import GroupInfo from "./GroupInfo";
import GroupPrayList from "./GroupPrayList";
import RightIcons from "./RightIcons";
import { useState } from "react";
import GroupSetting from "../GroupSetting/GroupSetting";
import { useGroupPray } from "../../../hooks/useGroupPray";
import { useCategory } from "../../../hooks/useCategory";
import { ScrollSynchronizedPrayerList } from "../../ScrollSynchronizedCategoryList/ScrollSynchronizedPrayerList";
import useToast from "../../../hooks/useToast";
import { ToastTheme } from "../../Toast/Toast";
import useMobileShareMode from "../../../hooks/useMobileShareMode";
import useCheckMobile from "../../../hooks/useCheckMobile";
import { usePray } from "../../../hooks/usePray";
import {
  groupIdAtom,
  useSelectionModal,
} from "../../../overlays/SelectionModal/useSelectionModal";
import { useSetAtom } from "jotai";

const GroupDetail = ({ group, setShowGroupDetail }) => {
  const [showGroupSetting, setShowGroupSetting] = useState(false);
  const { groupPrayList, groupNotification } = useGroupPray(group.id);
  const isGroupPrayListData = Object.keys(groupPrayList).length !== 0;
  const { shareLink } = useMobileShareMode();
  const { isMobile } = useCheckMobile();
  const WEB_ORIGIN = process.env.REACT_APP_WEB_ORIGIN;

  const [bringMode, setBringMode] = useState(false);
  const [tab, setTab] = useState("personal");
  const { categoryList, firstCategoryIndex, refetchCategoryList } =
    useCategory(tab);
  const [selectedCategoryIndex, setSelectedCategoryIndex] =
    useState(firstCategoryIndex);
  const { isOpened } = useSelectionModal();
  const setGroupId = useSetAtom(groupIdAtom);

  const { showToast } = useToast({});
  const { prayList } = usePray("personal");

  useEffect(() => {
    setGroupId(group.id);
  }, []);

  useEffect(() => {
    refetchCategoryList();
  }, [tab]);

  useEffect(() => {
    setSelectedCategoryIndex(firstCategoryIndex);
  }, [categoryList]);

  const onInvite = async () => {
    const groupId = group.id;
    var encodeGroupId = window.btoa(groupId.toString());
    if (isMobile()) {
      shareLink({
        type: "LINK",
        data: {
          title: "유스프레이 그룹에 참여해 함께 기도제목을 나눠요!",
          url: `${WEB_ORIGIN}/group?id=` + encodeGroupId,
        },
      });
    } else {
      showToast({
        message: "초대하기가 지원되지 않는 환경 입니다.",
        theme: ToastTheme.ERROR,
      });
    }
    console.log(`${WEB_ORIGIN}/group?id=` + encodeGroupId);
  };

  return (
    <Wrapper>
      {showGroupSetting && (
        <GroupSetting group={group} setShowGroupSetting={setShowGroupSetting} />
      )}
      <UserHeader
        rightIcons={() => {
          return (
            <RightIcons
              group={group}
              setShow={setShowGroupSetting}
              groupNoti={groupNotification}
            />
          );
        }}
        back={() => setShowGroupDetail((prev) => !prev)}
      >
        {group.name}
      </UserHeader>
      <GroupWrapper>
        <GroupInfo
          group={group}
          isData={isGroupPrayListData}
          categoryList={categoryList}
          firstCategoryIndex={firstCategoryIndex}
          bringMode={bringMode}
          setBringMode={setBringMode}
          setTab={setTab}
        />
        <GroupPrayList
          group={group}
          groupPrayList={groupPrayList}
          isData={isGroupPrayListData}
          categoryList={categoryList}
          firstCategoryIndex={firstCategoryIndex}
          setTab={setTab}
          tab={tab}
        />
      </GroupWrapper>
      <InviteBtn
        src="images/ic_group_invite.svg"
        alt="group_invite_icon"
        onClick={onInvite}
      />
      {isOpened && (
        <PrayerListWrapper>
          <ScrollSynchronizedPrayerList
            isSharedPrayers={false}
            categoriesWithPrayers={prayList}
          />
        </PrayerListWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  position: fixed;
  z-index: 100;
`;

const PrayerListWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-radius: 32px 32px 0px 0px;
`;

const GroupWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
`;

const InviteBtn = styled.img`
  position: fixed;
  bottom: 80px;
  right: 20px;
`;

export default GroupDetail;
