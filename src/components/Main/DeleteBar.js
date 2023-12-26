import React from 'react';
import styled from 'styled-components';
import delete_btn from '../../images/Delete_btn.svg';
import Logo from './Logo';

const Delete_btn = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100vw - 48px);
    z-index: 103;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 24px 16px 16px 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    transition: all 0.3s ease-in-out;
`
const DeleteImg = styled(Logo)`
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
    align-self: center;
`;

const Deletefont = styled.div`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #FF6B6B;
`
const Btn_set = styled.button`
    background: #F0F0F0;
    border-radius: 16px;
    border: none;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    color: #808080;
    padding: 16px 0px;
    flex-grow: 1;
`

const DeleteBar = ({deleteBtnClick, onDeleted, id, isDeleted}) => {
    return (
        <Delete_btn style={{opacity : isDeleted ? "1" : "0", top : isDeleted ? "50%" : "110%", zIndex: isDeleted ? "103" : "0"}}>
            <DeleteImg src={delete_btn}/>
            <Deletefont style={{marginBottom: "2px"}}>정말 삭제하시겠습니까?</Deletefont>
            <Deletefont style={{fontWeight: "400", fontSize:'18px', lineHeight:'26px', marginBottom: "42px"}}>다른 목록에서 확인할 수 었습니다.</Deletefont>
            <div style={{display:'flex', gap:"8px"}}>
                <Btn_set onClick={onDeleted}>취소</Btn_set>
                <Btn_set style={{background:"#FF6B6B", color:'#FFFFFF'}} onClick={() => deleteBtnClick(id)}>삭제</Btn_set>
            </div>
        </Delete_btn>
    );
};

export default DeleteBar;