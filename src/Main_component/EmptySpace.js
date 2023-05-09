import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import green_prayer_img from '../images/green_prayer_img.svg';
import white_prayer_img from "../images/white_prayer_img.svg";

const EmptyBackgroud = styled.div`
    height: 246px;
`

const PrayerImg = styled(Logo)`
`;

const EmptySpace = ({color}) =>{
    return(
        <EmptyBackgroud>
            <div style={{width: '42px', height:'60px',  marginTop:'75px', marginLeft: '171px', marginRight: '171px'}}>
                {color ? <PrayerImg src={green_prayer_img} style={{width:'40px', height:'58px'}}/> : <PrayerImg src={white_prayer_img} style={{width:'40px', height:'58px'}}/>}</div>
            <div style={{marginLeft:'85px', marginRight:'84px',fontFamily:'Noto Sans KR',fontStyle: 'normal',fontWeight: '500' , fontSize: '20px',
            lineHeight: '29px', marginTop:'8px', color: color ? '#7BAB6E' : '#FFFFFF'}}>기도제목을 추가해보세요.</div>
        </EmptyBackgroud>
    )
}

export default EmptySpace;