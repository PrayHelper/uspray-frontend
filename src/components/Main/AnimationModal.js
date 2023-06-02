import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Animation_check from '../../images/ic_animation_check.svg';

const AnimationStyle = styled.div`
    position : fixed;
    display: flex;
    just-content: center;
    text-align: center;
    padding: 16px;
    padding-left: 16px;
    padding-right: 16px;
    // gap: 10px;
    border-radius: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 88.837%;
    height: 28px;
    background-color: #78AB6E;
    z-index: 10000;
`
const SubAnimation = styled.div`
    display: flex;
    just-content: space-between;
`
const AnimationText = styled.div`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    color: #FFFFFF;
`
const AnimationCheck = styled(Logo)`
    width: 24px;
    height: 24px;
    margin-right: 8px;
`
const AnimationModal = ({modalText}) => {
    console.log(modalText);
    return (
        <AnimationStyle>
            <SubAnimation>
                <AnimationCheck src={Animation_check}/>
                <AnimationText>{modalText}</AnimationText>
            </SubAnimation>
        </AnimationStyle>
    );
};

export default AnimationModal;