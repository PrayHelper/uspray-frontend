import completeImage from '../../images/check_img.svg';
import deleteImage from '../../images/delete_img.svg';
import modifyImage from '../../images/modify_img.svg';
import {createContext, useEffect, useRef, useState} from 'react';
import {usePray} from '../../hooks/usePray';
import useToast from '../../hooks/useToast';
import useBottomNav from '../../hooks/useBottomNav';
import CategoryTag from '../CategoryTag/CategoryTag';
import PrayDateCategoryInput from '../PrayDateCategoryInput/PrayDateCategoryInput';
import BlackScreen from '../BlackScreen';
import {Modal} from '@mui/material';
import {ToastTheme} from '../Toast/Toast';
import S from './ScrollSynchronizedCategoryList.style';
import {useCallback} from 'react';
import TopCategoryList from './TopCategoryList/TopCategoryList';
import BottomCategoryBoxList from './BottomBoxList/BottomBoxList';
import ShareSelectionModal, {
  useShareSelection,
} from '../../overlays/ShareSelectionModal/ShareSelectionModal';

export const PrayerListDataContext = createContext({
  isSharedPrayers: false,
  isSharingMode: false,
  categoriesWithPrayers: [],
});

export const PrayerListScrollingContext = createContext({
  registerTopItemRef: (id, node) => {},
  registerBottomItemRef: (id, node) => {},
  onClickTopItem: id => {},
  registerTopListRef: node => {},
  registerBottomListRef: node => {},
  selectedId: null,
});

const PrayerListScrollingProvider = ({children}) => {
  const topItemsRef = useRef({});
  const bottomItemsRef = useRef({});
  const topListRef = useRef(null);
  const bottomListRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);

  const syncTopScroll = useCallback(id => {
    const item = topItemsRef.current[id];

    const offset = -16;

    if (item && topListRef.current) {
      topListRef.current.scrollTo({
        left: item.offsetLeft + offset,
        behavior: 'smooth',
      });
    }
  }, []);

  const syncBottomScroll = useCallback(id => {
    const item = bottomItemsRef.current[id];

    const offset = -98;

    if (item && bottomListRef) {
      bottomListRef.current.scrollTo({
        top: item.offsetTop + offset,
        behavior: 'smooth',
      });
    }
  }, []);

  const onClickTopItem = useCallback(
    id => {
      syncBottomScroll(id);
    },
    [syncBottomScroll],
  );

  const handleBottomScroll = useCallback(
    event => {
      // 상단 리스트에서 발생한 scroll은 무시
      if (event && event.target.contains(topListRef.current)) {
        console.log(1);
        return;
      }

      if (!bottomItemsRef?.current) return;
      if (!bottomListRef?.current) return;

      const {id} = Object.keys(bottomItemsRef.current).reduce(
        (acc, id) => {
          const nowSection = bottomItemsRef.current[id];
          if (!nowSection) {
            return {id, diffrenceFromTop: 0};
          }

          const checkRef = nowSection.getBoundingClientRect();
          const listRect = bottomListRef.current.getBoundingClientRect();

          const diffrenceFromTop = Math.abs(checkRef.top - listRect.top);

          if (diffrenceFromTop >= acc.diffrenceFromTop) return acc;

          return {
            id,
            diffrenceFromTop,
          };
        },
        {
          id: '',
          diffrenceFromTop: 9999,
        },
      );

      if (selectedId !== id) {
        syncTopScroll(id);
        setSelectedId(id);
      }
    },
    [selectedId, syncTopScroll],
  );

  const debounceScroll = debounce(handleBottomScroll, 50);

  useEffect(() => {
    document.addEventListener('scroll', debounceScroll, true);

    handleBottomScroll();

    return () => document.removeEventListener('scroll', debounceScroll, true);
  }, [handleBottomScroll, debounceScroll]);

  const registerTopItemRef = useCallback((id, node) => {
    if (!node) delete topItemsRef.current[id];
    else topItemsRef.current[id] = node;
  }, []);

  const registerBottomItemRef = useCallback((id, node) => {
    if (!node) delete bottomItemsRef.current[id];
    else bottomItemsRef.current[id] = node;
  }, []);

  const registerTopListRef = useCallback(node => {
    if (!node) delete topListRef.current;
    else topListRef.current = node;
  }, []);

  const registerBottomListRef = useCallback(node => {
    if (!node) delete bottomListRef.current;
    else bottomListRef.current = node;
  }, []);

  return (
    <PrayerListScrollingContext.Provider
      value={{
        registerTopItemRef,
        registerBottomItemRef,
        registerTopListRef,
        registerBottomListRef,
        onClickTopItem,
        selectedId,
      }}>
      {children}
    </PrayerListScrollingContext.Provider>
  );
};

export const ScrollSynchronizedPrayerList = ({
  categoriesWithPrayers,
  isSharedPrayers,
}) => {
  const {isOpened: isSharingMode} = useShareSelection();

  const {controlledModalProps} = useShareSelection();

  // 더 세련된 방법으로 z-index를 제어하는 방법을 찾았다면 고쳐주세요ㅜㅜ
  const zIndex = isSharingMode ? 131 : 'auto';

  return (
    <PrayerListDataContext.Provider
      value={{categoriesWithPrayers, isSharedPrayers, isSharingMode}}>
      <PrayerListScrollingProvider>
        <S.WrapperNew zIndex={zIndex}>
          <TopCategoryList />
          <BottomCategoryBoxList />
        </S.WrapperNew>
        <ShareSelectionModal {...controlledModalProps} />
      </PrayerListScrollingProvider>
    </PrayerListDataContext.Provider>
  );
};

const ScrollSynchronizedCategoryList = ({
  categoryList,
  setShowCategorySetting,
  selectedCategoryIndex,
  setSelectedCategoryIndex,
  tabType,
  setCategoryRefIndex,
  shareMode,
  setShareMode,
  listHandler,
  setIsPraySelected,
}) => {
  const [selectedPrayInfo, setSelectedPrayInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  // 기도제목 수정할 때 아래 기도 정보 사용
  const [modifyPrayInfo, setModifyPrayInfo] = useState(null);
  const [prayInputValue, setPrayInputValue] = useState('');
  const [dateInputValue, setDateInputValue] = useState(null);
  const [categoryInputValue, setCategoryInputValue] = useState(0);
  const [checkedList, setCheckedList] = useState([]);
  const {prayList, deletePray, completePray, modifyPray} = usePray(tabType);
  const {showToast} = useToast({});
  const {setIsVisible} = useBottomNav();
  const contentRef = useRef(null);

  const prayModify = () => {
    setModifyPrayInfo(selectedPrayInfo);
    setSelectedPrayInfo(null);
  };

  useEffect(() => {
    if (modifyPrayInfo) {
      setPrayInputValue(modifyPrayInfo.content);
      setDateInputValue(modifyPrayInfo.deadline);
      setCategoryInputValue(modifyPrayInfo.categoryId);
      setShowSubModal(true);
    }
  }, [modifyPrayInfo]);

  useEffect(() => {
    if (showSubModal || showModal) {
      setIsPraySelected(true);
      setIsVisible(false);
    } else {
      setIsPraySelected(false);
      setIsVisible(true);
    }
  }, [showSubModal, showModal, setIsPraySelected, setIsVisible]);

  useEffect(() => {
    if (!shareMode) setCheckedList([]);
  }, [shareMode]);

  // 기도를 수정하는 함수
  const onModify = async (text, deadline, categoryId) => {
    modifyPray(
      {
        prayId: modifyPrayInfo.prayId,
        content: text,
        deadline: deadline,
        categoryId: categoryId,
      },
      {
        onSuccess: () => {
          setShowSubModal(false);
          setPrayInputValue('');
          setDateInputValue(null);
          setSelectedCategoryIndex(categoryId);
        },
      },
    );
  };

  const onCancel = () => {
    setShareMode(false);
    setShowModal(false);
    setSelectedPrayInfo(null);
  };

  const onDelete = () => {
    setShowModal(true);
  };

  const clickShareButton = () => {
    if (checkedList.length !== 0) {
      listHandler(checkedList);
    }
  };

  const clickBlackBackground = () => {
    if (!shareMode) {
      setSelectedPrayInfo(null);
    }
  };

  return (
    <>
      <S.Wrapper shareMode={shareMode}>
        <BlackScreen
          isModalOn={showModal}
          onClick={() => setShowModal(false)}
        />
        {showModal && (
          <Modal
            isModalOn={showModal}
            iconSrc={'images/ic_group_pray_delete.svg'}
            iconAlt={'group_pray_delete'}
            mainContent={'정말 삭제하시겠습니까?'}
            subContent={'선택한 기도제목이 삭제됩니다.'}
            btnContent={'삭제'}
            btnContent2={'취소'}
            onClickBtn={() => {
              deletePray(selectedPrayInfo.prayId, {
                onSuccess: () => {
                  setShowModal(false);
                  setSelectedPrayInfo(null);
                },
              });
            }}
            onClickBtn2={onCancel}
            modalTheme={2}
          />
        )}
        {showSubModal && (
          <PrayDateCategoryInput
            categoryList={categoryList}
            showSubModal={showSubModal}
            setShowSubModal={setShowSubModal}
            inputPlaceHodler={modifyPrayInfo.content}
            maxrow={3}
            maxlen={75}
            isShowWordCount={true}
            isDefault={modifyPrayInfo.isShared}
            setUpdateValue={setPrayInputValue}
            setUpdateDate={setDateInputValue}
            setUpdateCategory={setCategoryInputValue}
            buttonText="기도제목 수정"
            value={prayInputValue}
            date={modifyPrayInfo.deadline}
            category={modifyPrayInfo.categoryId}
            onClickFunc={() =>
              onModify(prayInputValue, dateInputValue, categoryInputValue)
            }
          />
        )}
        {prayList && (
          <>
            <S.TopWrapper shareMode={shareMode}>
              <CategoryTag
                categoryList={categoryList}
                selectedCategoryIndex={selectedCategoryIndex}
                setSelectedCategoryIndex={setSelectedCategoryIndex}
                setShowCategorySetting={setShowCategorySetting}
                canAdd={!shareMode}
                setCategoryRefIndex={setCategoryRefIndex}
              />
            </S.TopWrapper>
            <S.Content ref={contentRef}>
              {/* <VerticalCategories
                {...{
                  categoryRef,
                  checkedList,
                  setCheckedList,
                  shareMode,
                  setSelectedPrayInfo,
                  setClickedCategoryData,
                  tabType,
                  prayList,
                }}
              /> */}
            </S.Content>
          </>
        )}
      </S.Wrapper>
      <S.BottomSetWrapper
        selectedPrayInfo={selectedPrayInfo}
        showModal={showModal}>
        <S.BottomButtonWrapper>
          <img src={completeImage} alt="" />
          <S.BottomButtonText
            color={'green'}
            onClick={() => {
              completePray(selectedPrayInfo.prayId);
              showToast({
                message: '기도제목을 완료했어요.',
                theme: ToastTheme.SUCCESS,
              });
              setSelectedPrayInfo(null);
            }}>
            완료하기
          </S.BottomButtonText>
        </S.BottomButtonWrapper>
        <S.BottomButtonWrapper>
          <img src={modifyImage} alt="" />
          <S.BottomButtonText
            color={'blue'}
            onClick={() => prayModify(selectedPrayInfo)}>
            수정하기
          </S.BottomButtonText>
        </S.BottomButtonWrapper>
        <S.BottomButtonWrapper>
          <img src={deleteImage} alt="" />
          <S.BottomButtonText color={'red'} onClick={() => onDelete()}>
            삭제하기
          </S.BottomButtonText>
        </S.BottomButtonWrapper>
      </S.BottomSetWrapper>
      <S.BottomShareWrapper shareMode={shareMode}>
        <S.ShareNumberText>{checkedList.length + '개 선택'}</S.ShareNumberText>
        <S.ShareButtonContainer>
          <S.ShareButtonWrapper
            disabled={true}
            color={'white'}
            onClick={onCancel}>
            취소하기
            <S.ShareButtonImage src="images/ic_share_cancel.svg" />
          </S.ShareButtonWrapper>
          <S.ShareButtonWrapper
            disabled={checkedList.length === 0}
            color={'green'}
            onClick={clickShareButton}>
            공유하기
            <S.ShareButtonImage src="images/ic_share_move.svg" />
          </S.ShareButtonWrapper>
        </S.ShareButtonContainer>
      </S.BottomShareWrapper>
      <S.BlackBackground
        selectedPrayInfo={selectedPrayInfo}
        shareMode={shareMode}
        onClick={clickBlackBackground}
        showModal={showModal}
      />
    </>
  );
};

export default ScrollSynchronizedCategoryList;

const debounce = (func, waitFor) => {
  let timeout = null;

  const debounced = (...args) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced;
};
