import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import DayButton from "./DayButton";
import BackgroundBright from "./BackgroundBright";
import DisableImage from "../../images/ic_disable_image.svg";
import noClickImage from "../../images/no_click_image.svg";
import { useGetInfo } from "../../hooks/useGetInfo";
import SelectDate from "../SelectDate/selectDate";
import SelectDateInput from "../SelectDateInput/selectDateInput";

const BackgroundWrapper = styled.div`
    width: 100%; 
    background-color: #7BAB6E;
    overflow-y : hidden;

`

const BackgroundInput = styled.div`
    display: flex;
    position: relative;
    padding: 16px 12px 12px 12px;
    border-radius : ${(props) => props.visible ? "16px 16px 0px 0px" : "16px"};
    background: white;
    box-sizing: border - box;
    align-items: center;
    transition: all 0.5s ease -in -out;
`;

const InnerInput = styled.div`
    width: 100%;
    border-bottom: 1px solid #EBF6E8;
`
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
    gap: ${(props) => props.visible ? "0px" : "16px"};
    z-index : 103;
`;

const InnerComponent = styled.div`
    background-color: white;
    padding: 0px 0px 12px 12px;
    border-radius : 0px 0px 12px 12px;
`

const BtnSend = styled.button`
    width: 31px;
    height: 31px;
    border: 1px solid #ebf7e8;
    border-radius: 6.261px;
    transform: matrix(-1, 0, 0, 1, 0, 0);
    background - color: white;
    transition: all 0.5s ease-in-out;
    &:active {
        transition: all 0.5s ease -in -out;
        background - color: #75bd62;
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
    border : none;
    font-size: 16px;
    color: #a0a0a0;
    outline: none;
    ::placeholder {
        color: #b7ceb0; // 원하는 색상으로 변경
    }
    font-style: normal;
    font-weight: 400;
    border-bottom : 1px solid #EBF6E8;
    width: 100%;
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


const BtnWrapper = styled.div`
    position : fixed;
    width : 100%;
    display : flex;
    padding : 0px 16px;
    box-sizing : border-box; 
    border-radius : 16px;
    justify-content : center;
    top : ${(props) => props.visible ? "80%" : "100%"};
    transition : all 0.5s ease-in-out;
    z-index : 103;
`

const BtnComponent = styled.button`
    width : 100%;
    padding : 20px 0px;
    font-size: 16px;
    border-radius : 16px;
    border : none;
    background-color  : #7BAB6E;
    color : #FFF;
    opacity : ${(props) => props.visible ? "1" : "0"};
    filter: ${(props) => (props.value == "") ? "brightness(0.7)" : "brightness(1)"}
`

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
    const [selectedBtn, setSelectedBtn] = useState("");
    const [selectedDate, setSelectedDate] = useState(null); // 선택한 날짜
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);

    const widthChange = () => {
        setVisible(!visible);
        console.log(showSubModal);
        if (shareToggle) {
            setshareToggle(!shareToggle);
            setIsShare(!isShare);
        }
    };

    const widthChangeInput = () => {
        setShowSubModal(!showSubModal);
    }
    const dayInfo = (e) => {
        setDay(e);
    };

    const onSubmit = () => {
        if (day === 0) {
            setVisible(!visible);
        }
    };
    const onChange = (e) => {
        if (e.target.value.length < 75) { // 이 또한 modal로 인해 잠시 주석처리
            setValue(e.target.value);
        } else {
            // setmodalText("75자까지 입력이 가능합니다.")
            //     setmodalToggle(!modalToggle);
        }
    };

    const dDayCalculate = (res_data) => {
        var today = new Date();
        var dday = new Date(res_data);
        dday.setHours(23, 59, 59);
        var diff = dday.getTime() - today.getTime();
        var result = Math.floor(diff / (1000 * 60 * 60 * 24));
        return result;
    };

    const submit = () => {
        setVisible(!visible);
        setValue("");
        var dday = dDayCalculate(updateDate);
        onInsert(name, dday, value);
        // setDayToggle(false);
        setShowSubModal(!showSubModal);
        setUpdateDate(null);
    };
    const changeCheckTop = () => {
        setVisible(!visible);
        setSelectedBtn("");
        setSelectedDate(null);
        setShowDatePicker(false);
        setShowSubModal(false);
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
        <BackgroundWrapper>
            <MainComponent>
                {showSubModal ? "" :
                    <LogoTitle>
                        Uspray
                    </LogoTitle>}
                <BackgroundInput>
                    {showSubModal ? (<SelectDateInput
                        {...{
                            setShowSubModal,
                            selectedBtn,
                            setSelectedBtn,
                            selectedDate,
                            setSelectedDate,
                            showDatePicker,
                            setShowDatePicker,
                            setUpdateDate,
                            showSubModal,
                            setValue
                        }}
                        onClickFunc={submit}
                        inputPlaceHolder={"기도제목을 입력해주세요"}
                        maxlen={75}
                        maxrow={3}
                    />) : <StyleInput placeholder="기도제목을 입력해주세요" type="text" value={value} onChange={onChange}
                        onClick={widthChangeInput} />}
                </BackgroundInput>
            </MainComponent >
            {/* <BackgroundBright
                onClick={changeCheckTop}
                style={{
                    opacity: visible ? "1" : "0",
                    pointerEvents: visible ? "auto" : "none",
                }}
            /> */}
            {/* <BtnWrapper visible={visible}>
                <BtnComponent visible={visible} value={value} onClick={() => submit()}>기도제목 작성</BtnComponent>
            </BtnWrapper> */}
            {children}
        </BackgroundWrapper >
    );
}

export default TemplateMain;
