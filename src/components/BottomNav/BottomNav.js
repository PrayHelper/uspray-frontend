import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BottomNavStyle } from "./style";
import {Outlet} from "react-router";

const BottomNav = () => {
  const [activeNav, setActiveNav] = useState(1);
  const location = useLocation();

  useEffect(() => {
    let activeUrl = location.pathname;

    switch (activeUrl) {
      case "/main":
        setActiveNav(1);
        break;
      case "/group":
        setActiveNav(2);
        break;
      case "/history":
        setActiveNav(3);
        break;
      case "/settings":
        setActiveNav(4);
        break;
      default:
        setActiveNav(1);
    }
  }, [location.pathname]);

  return (
    <>
      <BottomNavStyle>
        <Link to="/main" onClick={() => setActiveNav(1)}>
          {activeNav === 1 ? (
            <img src="images/ic_main_filled.svg" alt="filled_main_icon" />
          ) : (
            <img src="images/ic_main.svg" alt="main_icon" />
          )}
        </Link>
        <Link to="/group" onClick={() => setActiveNav(2)}>
          {activeNav === 2 ? (
            <img src="images/ic_group_filled.svg" alt="filled_group_icon" />
          ) : (
            <img src="images/ic_group.svg" alt="group_icon" />
          )}
        </Link>
        <Link to="/history" onClick={() => setActiveNav(3)}>
          {activeNav === 3 ? (
            <img src="images/ic_history_filled.svg" alt="filled_history_icon" />
          ) : (
            <img src="images/ic_history.svg" alt="history_icon" />
          )}
        </Link>
        <Link to="/settings" onClick={() => setActiveNav(4)}>
          {activeNav === 4 ? (
            <img src="images/ic_setting_filled.svg" alt="filled_setting_icon" />
          ) : (
            <img src={process.env.PUBLIC_URL + 'images/ic_setting.svg'} alt="setting_icon" />
          )}
        </Link>
      </BottomNavStyle>
      <Outlet />
    </>
  );
};

export default BottomNav;
