import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Download_img from "../../images/Click_img.svg";
import ShareCheckBox from "./ShareCheckBox";
import ShareBotCheckBox from "./ShareBotCheckBox";


const MainContent = styled.div`
    display: flex;
    justify-content: space-between;
    height: auto;
    // margin-left : 16px;
    margin: 0 16px; 
    margin-top : 22px;
    margin-bottom: 12px;
    border-bottom : solid;
    border-bottom-color: #CECECE;
    padding-right: 4px;
    padding-bottom : 8px;
`

const NameContent = styled.div`
    width: 42px;
    height: 17px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    // font-size: 12px;
    margin-right: 8px;
    border-right: 1px solid #CECECE;
    font-size: 10px;
    line-height: 17px;
`;

const TextContent = styled.div`
    width: 263px;
    padding : 0px;
    margin-right: 8px; 
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
`;

const DdayContent = styled.div`
    width : 45px;
    font-size : 10px;
    heigth : 17px;
    text-align : center;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    // margin-left: 4px;
    margin-right: 4px;
    margin-top : 4px;
`;
const ClickImg = styled(Logo)`
    width: 24px;
    height: 24px;
`;



function PrayerContent({content, dayToggle , countUpdate, bottom, contentClick, isShare, shareList, clickOff}){
    const {id, dday,text,checked, name, count} = content;
    const clickHandler = (event) =>{
        console.log(event.target.id);
        if(!checked){
        return shareList(event.target.id, !checked);
        }
        else{
            clickOff(id);
        }
    }
    return(
        <MainContent>
            {isShare && (!bottom ?         
            <ShareCheckBox id = {id} checked={checked} handler = {clickHandler} /> : 
            <ShareBotCheckBox id={id} checked={checked} handler={clickHandler}/>)}
            <NameContent style={{color : bottom ? '#FFFFFF' : '#7BAB6F'}}>{name}</NameContent>
            <TextContent style={{color: bottom ? '#D0E8CB' : '#496143'}}onClick={() => contentClick(id)}>{text}</TextContent>
            {dayToggle ? <DdayContent style={{color : bottom ? '#FFFFFF' : '#A1B398', fontSize: "10px"}}>{(dday !== 0) ? "D-"+ dday : "D-Day"}</DdayContent> : <DdayContent style={{color : bottom ? '#FFFFFF' : '#A1B398'}}>{count + "회"}</DdayContent>}
            {!isShare && !bottom && <div className="image" style={{}}><ClickImg src={Download_img} onClick={() => countUpdate(id)} style={{width:'24px', height:'24px'}}/></div>}
        </MainContent>
    )
}

export default PrayerContent;


