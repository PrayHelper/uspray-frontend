import React, {useState} from "react";
import PrayerContent from "./PrayerContent";
import styled from 'styled-components';
import BottomMenu from "./BottomMenu";
import Share from "./Share";
import ModifyBar from "./ModifyBar";
import BackgroundBright from "./BackgroundBright";
import EmptySpace from "./EmptySpace";
import serverapi from "../api/serverapi";

const Background =  styled.div`
    width  : 430px; 
    background-color: #D0E8CB;
    max-height: 10000px;
`// 여기서 height에 10000px로 설정해둔것이 문제임.

const TopContent = styled.div`
    display: flex;
    margin-left : 32px;
`;

const TodayPrayer = styled.div`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
    width : 65px;
    height : 17px;
    margin-top : 44px;
    margin-bottom: 13px;
    margin-right : 220px;
    color: #7BAB6E;
`;
const BtnSet = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    width: 88px;
    height: 26px;
    margin-bottom: 8px;
    margin-top : 40px;
    background-color:#7BAB6E; 
    border : none;
`;

const BtnElementDay = styled.button`
    width: 38px;
    height: 18px;
    font-size: 10px;
    padding: 0px;
    border: none;
`;

const BtnElementPrayer = styled.button`
    width: 38px;
    height: 18px;
    font-size: 10px;
    padding: 0px;
    border: none;
`;

const PrayerContentStyle = styled.div`
    width: 382px;
    background-color: #FFFFFF;
    margin-right : 24px;
    margin-left : 24px;
    margin-bottom: 8px;
    border-radius: 16px;
    border: 1px solid #7BAB6F;
    min-height: 244px;
`;


function PrayerList({prayer_content, setPrayer_content, prayer_more_content, CountUpdate, CompleteBtnClick, 
    ModifyBtnClick, DeleteBtnClick, isChecked, click_id, ContentClick, isModify, onModify,
    ValueChange,ChangeCheck, ddayCaculate}){
    const [day_toggle_top_day , setDay_toggle_top_day] = useState(true);
    const [day_toggle_top_prayer , setDay_toggle_top_prayer] = useState(false);
    const [day_toggle_bottom_day , setDay_toggle_bottom_day] = useState(true);
    const [day_toggle_bottom_prayer , setDay_toggle_bottom_prayer] = useState(false);
    const [color_first_top, setColor_first_top] = useState('#EBF6E8');
    const [color_second_top, setColor_second_top] = useState('#7BAB6E');
    const [color_first_bottom, setColor_first_bottom] = useState('#EBF6E8');
    const [color_second_bottom, setColor_second_bottom] = useState('#7BAB6E');
    const [isShare, setIsShare] = useState(false);
    const [Share_list, setShare_list] = useState([]);
    const [share_toggle, setshare_toggle] = useState(false);
    const padding = isChecked ? "0px" : "24px";
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE2OTgzN2E5LThiNjMtNDEyYS05NzE2LWFjNjMxMTM0MzY2NCIsImFjY2Vzc190b2tlbl9leHAiOiIyMDIzLTA1LTE2VDA0OjAyOjIzLjA2NjAxMyJ9.kWhL0E7FC56dCLaY5PKijEKLxPUkzgOjV8DNEm97cIE";

    const getPrayList = async (query) => {
        const api = "/pray?sort_by=" + query;
        try {
          const res= await serverapi.get(api, { headers: {
            'Authorization': `${accessToken}`}});
          if (res.status === 200) {
            var prayer_content_ = [];
            for(var i = 0;i<Object.keys(res.data).length;i++){
              var result = ddayCaculate(res.data[i].deadline);
                prayer_content_[i] = {
                  id : res.data[i].id,
                  name: '김정묵',
                  dday: result,
                  text: res.data[i].title,
                  checked : true,
                  count : res.data[i].pray_cnt
                };
              }
            setPrayer_content(prayer_content_);
            }
          } catch (e){
          alert("error occured");
          console.log(e);
        }
    }

    const dayFucTopDay = (e) =>{
        if(!day_toggle_top_day){
            getPrayList("date");
            setDay_toggle_top_day(!day_toggle_top_day);
            setDay_toggle_top_prayer(!day_toggle_top_prayer);
            setColor_second_top('#7BAB6E');
            setColor_first_top('#EBF6E8');
        }
    }
    const dayFucTopPrayer = () =>{
        if(!day_toggle_top_prayer){
            getPrayList("cnt");
            setDay_toggle_top_prayer(!day_toggle_top_prayer);
            setDay_toggle_top_day(!day_toggle_top_day);
            setColor_first_top('#7BAB6E');
            setColor_second_top('#EBF6E8');
        }
    }

    const dayFucBottomDay = () =>{
        if(!day_toggle_bottom_day){
            setDay_toggle_bottom_day(!day_toggle_bottom_day);
            setDay_toggle_bottom_prayer(!day_toggle_bottom_prayer);
            setColor_second_bottom('#7BAB6E');
            setColor_first_bottom('#EBF6E8');
        }
    }
    const dayFucBottomPrayer = () =>{
        if(!day_toggle_bottom_prayer){
            setDay_toggle_bottom_prayer(!day_toggle_bottom_prayer);
            setDay_toggle_bottom_day(!day_toggle_bottom_day);
            setColor_first_bottom('#7BAB6E');
            setColor_second_bottom('#EBF6E8');
        }
    }

    const onShare = () =>{
        if(Share_list.length === 0){
            for(let i=0;i<prayer_content.length;i++){
                prayer_content[i].checked = false;
            }
            for(let i=0;i<prayer_more_content.length;i++){
                prayer_more_content[i].checked = false;
            }
            console.log("여기 입장");
        }
        setIsShare(!isShare);
        if(isShare){
            setshare_toggle(!share_toggle);
            setIsShare(!isShare);
            console.log(Share_list);
            setShare_list([]);
        }
        else{
            console.log(Share_list);
        }
        console.log(prayer_content);
        console.log(prayer_more_content);
    }

    const onCheck = () =>{
        setIsShare(!isShare);
    }
    const onMove = () =>{
        setshare_toggle(!share_toggle);
    }

    const ShareList = (id, check_box) =>{
        if(check_box){
            setShare_list([...Share_list,id]);
            if(id < 1000){
                prayer_content[Number(id)-1].checked = check_box;
            }
            else{
                prayer_more_content[Number(id)-1001].checked = check_box;
            }
        }
        else{
            setShare_list(Share_list.filter(list => (list !== id)));
            if(id < 1000){
                prayer_content[Number(id)-1].checked = check_box;
            }
            else{
                prayer_more_content[Number(id)-1001].checked = check_box;
            }
        }
        check_box = !check_box;
    }
    return(
        <div> 
            <Background style={{paddingBottom: padding}}>
                <TopContent>
                    <TodayPrayer>
                        기도할게요
                    </TodayPrayer>
                    <BtnSet>
                        <BtnElementDay onClick={dayFucTopDay} style={{backgroundColor: color_first_top, color : color_second_top}}>날짜순</BtnElementDay>
                        <BtnElementPrayer onClick={dayFucTopPrayer} style={{backgroundColor : color_second_top , color : color_first_top}} >기도순</BtnElementPrayer>
                    </BtnSet>
                </TopContent>
                <PrayerContentStyle>
                    {(prayer_content.length === 0) ? <EmptySpace color={true}/> : 
                    prayer_content.map((content,index) =>(
                        <PrayerContent key={index} content = {content} day_toggle ={day_toggle_top_day} CountUpdate = {CountUpdate} ContentClick = {ContentClick} 
                        isShare={isShare} ShareList={ShareList} bottom={false}/>
                    ))}
                </PrayerContentStyle>

                <TopContent>
                    <TodayPrayer style={{marginTop:'46px'}}>기도했어요</TodayPrayer>
                    <BtnSet>
                        <BtnElementDay onClick={dayFucBottomDay} style={{backgroundColor: color_first_bottom, color: color_second_bottom}}>날짜순</BtnElementDay>
                        <BtnElementPrayer onClick={dayFucBottomPrayer} style={{backgroundColor: color_second_bottom, color: color_first_bottom}}>기도순</BtnElementPrayer>
                    </BtnSet>
                </TopContent>
                <PrayerContentStyle style={{marginTop:'0px', background:'#7BAB6E'}}> 
                        {(prayer_more_content.length === 0) ? <EmptySpace color={false}/> : prayer_more_content.map((content,index) =>(
                            <PrayerContent key={index} content = {content} day_toggle ={day_toggle_bottom_day} CountUpdate = {CountUpdate}
                            isShare = {isShare} ShareList={ShareList} bottom = {true} prayer_more_content={prayer_more_content}/>
                        ))}
                </PrayerContentStyle>
                {!isModify && !isChecked && <Share onShare={onShare} onMove={onMove} share_toggle={share_toggle} onCheck={onCheck} isShare={isShare}></Share>}
                {isChecked && <BottomMenu CompleteBtnClick = {CompleteBtnClick} ModifyBtnClick = {ModifyBtnClick} 
                DeleteBtnClick = {DeleteBtnClick} click_id = {click_id}></BottomMenu>}
                {isChecked && <BackgroundBright style={{top:'0px', bottom:'153px'}} onClick={ChangeCheck}></BackgroundBright>}
                {isModify && <BackgroundBright style={{top:'0px', bottom:'148px'}}onClick={onModify}></BackgroundBright>}
                {isModify  &&  <ModifyBar id ={click_id} ValueChange = {ValueChange}/>}
            </Background>
        </div>
    )
}


export default PrayerList; 