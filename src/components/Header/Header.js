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
            <Link to={"/historySearch"} style={{ textDecoration: "none" }}>
              <img src="../images/ic_search_grey.svg" alt="icon_search" />
            </Link>
          )}
        </HeaderCont>
        {props.children === "히스토리" && (
          <BtnWrapper>
            <MyBtn
              id="date"
              onClick={props.onClickToggle}
              sortBy={props.sortBy}
            >
              내가 쓴 기도
            </MyBtn>
            <SharedBtn
              id="cnt"
              onClick={props.onClickToggle}
              sortBy={props.sortBy}
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
