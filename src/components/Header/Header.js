import { Link } from "react-router-dom";
import {
  HeaderWrapper,
  HeaderCont,
  BtnWrapper,
  MyBtn,
  SharedBtn,
} from "./style";

const Header = (props) => {
  return (
    <div style={{ width: "100%" }}>
      <HeaderWrapper>
        <HeaderCont>
          <div>{props.children}</div>
          {props.children === "히스토리" && (
            <img
              src="../images/ic_search_grey.svg"
              alt="icon_search"
              onClick={() => props.setIsOverlayOn(true)}
            />
          )}
        </HeaderCont>
        {props.children === "히스토리" && (
          <BtnWrapper>
            <MyBtn id="personal" onClick={props.onClickToggle} tab={props.tab}>
              내가 쓴 기도
            </MyBtn>
            <SharedBtn
              id="shared"
              onClick={props.onClickToggle}
              tab={props.tab}
            >
              공유받은 기도
            </SharedBtn>
          </BtnWrapper>
        )}
      </HeaderWrapper>
    </div>
  );
};

export default Header;
