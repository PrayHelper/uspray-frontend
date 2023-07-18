import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import check_img from '../../images/check_img.svg';
import delete_img from '../../images/delete_img.svg';
import modify_img from '../../images/modify_img.svg';

const MainContainer = styled.div`
    display: flex;
    flex-direction : column;
    position: fixed;
    padding: 0px 24px;
    box-sizing: border-box;
    top: 1;
    bottom: 0;
    right: 0;
    left: 0;  
    width: 100%; 
    height: 153px;
    z-index: 1000;
    background-color: white;
    border-radius: 24px 24px 0px 0px;
`

const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow : 1;
    border : 1px;
    border-radius: 16px;
    background-color: #F8F8F8;
    padding: 12px 0px;
    box-sizing : border-box;
    justify-content: center; /* 이미지를 가로 방향 가운데 정렬 */
    align-items: center; 
`;

const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width : 100%;
    heigth: 112px;
    border: none;
    gap : 18px;
`;

const TextContainer = styled.div`
    display: flex;
    justify-content: center; 
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const ImgContainer = styled(Logo)`
    display: flex;
    justify-content: center; /* 이미지를 가로 방향 가운데 정렬 */
    align-items: center; 
    margin-bottom: 4px;
`;

const BottomMenu = ({completeBtnClick, modifyBtnClick, bottom_delete_click, clickId, changeCheck}) =>{
    return(
        <MainContainer>
            <div style={{display:"flex", justifyContent:"center"}}><div style={{display: "flex",width:"52px", height:'4px',marginTop:"12px",marginBottom:"25px", backgroundColor:"#EEEEEE", borderRadius:"4px"}} 
            onClick={changeCheck}></div></div>
            <SubContainer>
                <BoxContainer style={{color: '#27CD2F'}} onClick = {() => completeBtnClick(clickId)}><ImgContainer src ={check_img}/><TextContainer>완료하기</TextContainer></BoxContainer>
                <BoxContainer style={{color: '#408CFF'}} onClick = {() => modifyBtnClick(clickId)}><ImgContainer src={modify_img}/><TextContainer>수정하기</TextContainer></BoxContainer>
                <BoxContainer style={{color: '#FF4F4F'}} onClick = {() => bottom_delete_click()}><ImgContainer src={delete_img}/><TextContainer>삭제하기</TextContainer></BoxContainer>
            </SubContainer>
        </MainContainer>
    )
}

export default BottomMenu;

