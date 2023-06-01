import React from "react";
import styled from "styled-components";
import Share_Logo from "./ShareLogo";
import share_img from "../../images/share_img.svg";
import ShareMode from "./ShareMode";

const ShareImg = styled(Share_Logo)`
    // margin-left: 350px;
    margin-right: 24px;
`;
const Container = styled.div`
    display : flex;
    flex-direction: row-reverse;
    width: 100%;
    height: 128px;
    position: relative;
    margin-top: 38px;
    // margin-top : 98px;
    margin-bottom: 40px;
    z-index: 6;
`
function Share({onShare, onMove , shareToggle, onCheck, isShare}){
    return(
        <Container style={{zIndex : shareToggle ? "999" : "4"}}>
            {!shareToggle && <ShareImg  onClick={onMove} src={share_img}/>}
            {shareToggle && <ShareMode onMove={onMove} onShare={onShare} onCheck={onCheck} isShare={isShare}/>}
        </Container>
    )
}

export default Share;

