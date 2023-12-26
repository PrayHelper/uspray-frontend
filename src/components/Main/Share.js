import React from "react";
import styled from "styled-components";
import Share_Logo from "./ShareLogo";
import share_img from "../../images/share_img.svg";
import ShareMode from "./ShareMode";
import ShareImage from "../../images/ShareImg.svg";
const ShareImg = styled(Share_Logo)`
    position: fixed;
    right: 24px;
    bottom: 72px;
    border-radius: 50%;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.25);
    z-index : 0;
    transition: all 0.5s ease-in-out;
`;
const Container = styled.div`
    display : flex;
    flex-direction: row-reverse;
    width: 100%;
    height: 128px;
    // position: relative;
    margin-top: 38px;
    // margin-top : 98px;
    margin-bottom: 40px;
    z-index: 6;
    transition : all 0.3s ease-in-out;
`
function Share({ onShare, onMove, shareToggle, onCheck, isShare, shareLength, setshareToggle, isModify, isChecked }) {
    return (
        <Container style={{ zIndex: shareToggle ? "10000" : "4" }}>
            <ShareImg style={{ bottom: (!shareToggle) ? "72px" : "0px" }} onClick={onMove} src={ShareImage} />
            <ShareMode onMove={onMove} onShare={onShare} onCheck={onCheck} isShare={isShare}
                shareLength={shareLength} shareToggle={shareToggle} setshareToggle={setshareToggle} />
        </Container>
    )
}

export default Share;

