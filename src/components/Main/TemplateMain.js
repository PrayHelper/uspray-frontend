import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import DayButton from "./DayButton";
import BackgroundBright from "./BackgroundBright";
import DisableImage from "../../images/ic_disable_image.svg";
import noClickImage from "../../images/no_click_image.svg";
import { useGetInfo } from "../../hooks/useGetInfo";


const BackgroundInput = styled.div`
  display: flex;
  position: relative;
  padding: 16px 12px 8px 12px;
  border-radius : 16px;
  background: white;
  border-bottom: 1px solid white;
  box-sizing: border-box;
  align-items: center;
  z-index: 103;
  transition: all 0.5s ease-in-out;
`;

const LogoTitle = styled.div`
    color: #fff;
    font-size: 24px;
    font-weight: bold;
`;

const MainComponent = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 16px 16px 24px 16px;
    gap: 16px;
`;

const BtnSend = styled.button`
  width: 31px;
  height: 31px;
  border: 1px solid #ebf7e8;
  border-radius: 6.261px;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  background-color: white;
  transition: all 0.5s ease-in-out;
  &:active {
    transition: all 0.5s ease-in-out;
    background-color: #75bd62;
  }
`;

const BlankBtnSend = styled.button`
  width: 31px;
  height: 31px;
  border: 1px solid #ebf7e8;
  border-radius: 6.261px;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  background-color: white;
  transition: all 0.5s ease-in-out;
`;

const SendImg = styled(Logo)`
  width: 16.21px;
  height: 16.94px;
  transform: scaleX(-1);
  display: flex;
  justify-content: center;
  align-items: center;
  &:active {
    transition: all 0.5s ease-in-out;
    filter: brightness(5);
  }
`;

const BlankSendImg = styled(Logo)`
  width: 16.21px;
  height: 16.94px;
  transform: scaleX(-1);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  transition: all 0.3s ease-in-out;
`;

const StyleInput = styled.input`
  border: none;
  font-size: 16px;
  color: #a0a0a0;
  outline: none;
  border-bottom: 1px solid #ebf7e8;
  ::placeholder {
    color: #b7ceb0; // 원하는 색상으로 변경
  }
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyleName = styled.input`
  width: 48px;
  font-size: 16px;
  font-family: Noto Sans KR;
  font-weight: 400;
  color: #75bd62;
  outline: none;
  border: none;
  border-bottom: 1px solid #ebf7e8;
  margin-top: 69px;
`;

const TemplateMain = ({
    children,
    onInsert,
    shareToggle,
    setshareToggle,
    isShare,
    setIsShare,
}) => {
    const { data: userInfo, refetch: refetch_userInfo } = useGetInfo();
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState("");
    const [day, setDay] = useState(7);
    const [Toggle, setToggle] = useState(true);
    const [updateDate, setUpdateDate] = useState(null); // 잠시 안쓰는 상태
    const [dayToggle, setDayToggle] = useState(false); // 잠시 안쓰는 상태

    const widthChange = () => {
        setVisible(!visible);
        if (shareToggle) {
            setshareToggle(!shareToggle);
            setIsShare(!isShare);
        }
    };
    const dayInfo = (e) => {
        setDay(e);
    };

    const onSubmit = () => {
        if (day === 0) {
            setVisible(!visible);
        }
    };
    const onChange = (e) => {
        // if (e.target.value.length < 75) { // 이 또한 modal로 인해 잠시 주석처리
        setValue(e.target.value);
        // } else {
        //     setmodalText("75자까지 입력이 가능합니다.")
        //     setmodalToggle(!modalToggle);
        // }
    };
    const onName = (e) => {
        if (e.target.value.length < 5) {
            setName(e.target.value);
        }
    };
    const submit = () => {
        setVisible(!visible);
        setValue("");
        onInsert(name, day, value);
        setDay(7);
        setDayToggle(false);
        setUpdateDate(null);
    };
    const changeCheckTop = () => {
        setVisible(!visible);
        if (Toggle == false) {
            setToggle(!Toggle);
        }
    };

    useEffect(() => {
        if (!userInfo) {
            refetch_userInfo();
            return;
        }
        setName(userInfo.data.name);
    }, [userInfo]);

    useEffect(() => {
        if (!userInfo) {
            refetch_userInfo();
            return;
        }
        setName(userInfo.data.name)
    }, [userInfo])

    // useEffect(() => {이부분 또한 토스트 메세지가 어떻게 될지 몰라 임시로 주석처리
    //     if (modalText) {
    //       const timer = setTimeout(() => {
    //         setmodalToggle(false);
    //         setmodalText("");
    //       }, 5000);
    //       return () => clearTimeout(timer);
    //     }
    //   }, [modalText]);

    // useEffect(() => {
    //     if (modalToggle) {
    //         showToast({theme: ToastTheme.SUCCESS, message: modalText });
    //     }
    // }, [modalToggle]);

    return (
        <div style={{ width: "100%", backgroundColor: "#7BAB6E" }}>
            <MainComponent>
                <LogoTitle>
                    Uspray
                </LogoTitle>
                <BackgroundInput>
                    <StyleInput placeholder="기도제목을 입력해주세요" type="text" value={value} onChange={onChange}
                        onClick={(!visible) ? () => widthChange() : onSubmit()}></StyleInput>
                </BackgroundInput>
            </MainComponent>
            <BackgroundBright
                onClick={changeCheckTop}
                style={{
                    opacity: visible ? "1" : "0",
                    pointerEvents: visible ? "auto" : "none",
                }}
            />
            {children}
        </div>
    );
}

export default TemplateMain;
