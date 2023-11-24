import "./App.css";
import { Reset } from "styled-reset";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Outlet,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Locker from "./pages/Locker";
import LoginPage from "./components/Login/LoginPage";
import Settings from "./pages/Settings";
import History from "./pages/History";
import BottomNav from "./components/BottomNav/BottomNav";
import CheckInfo from "./pages/CheckInfo";
import ToS from "./pages/ToS";
import PrivacyProcessAgreement from "./pages/PrivacyProcessAgreement";
import Find from "./pages/Find";
import FindId from "./components/Find/FindId";
import FindIdResult from "./components/Find/IdResult";
import FindPassword from "./components/Find/FindPassword";
import FindPasswordResult from "./components/Find/PwResult";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ChangeInfo from "./pages/ChangeInfo";
import ChangePw from "./pages/ChangePw";
import ChangePhoneNumber from "./pages/ChangePhoneNumber";
import SocialLogin from "./pages/SocialLogin";
import useAuthToken from "./hooks/useAuthToken";
import useRefresh from "./hooks/useRefresh";
import { useEffect } from "react";
import SplashScreen from "./pages/SplashScreen";
import { useRecoilState, useRecoilValue } from "recoil";
import useAuthorized from "./hooks/useAuthorized";
import GlobalStyle from "./styles/GlobalStyle";
import useToast from "./hooks/useToast";
import HistorySearch from "./pages/HistorySearch";

const ContainerWrapper = styled.div`
  /* max-width: 430px; */
  margin: 0 auto;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
`;

const PrivateRoute = () => {
  const { isUnauthorized } = useAuthorized();

  if (isUnauthorized()) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

const CommonRoute = () => {
  const { isUndefined } = useAuthorized();

  const location = useLocation();
  const fullPath = location.pathname + location.search + location.hash;

  if (isUndefined()) {
    return (
      <Routes>
        <Route path="*" element={<SplashScreen url={fullPath} />} />
      </Routes>
    );
  }

  return <Outlet />;
};

function App() {
  const { renderToast } = useToast({});

  return (
    <BrowserRouter>
      <ContainerWrapper>
        <Container>
          <GlobalStyle />
          <Reset />
          <Routes>
            <Route element={<CommonRoute />}>
              <Route element={<PrivateRoute />}>
                <Route element={<BottomNav />}>
                  <Route path="/main" element={<Main />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/locker" element={<Locker />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="/checkInfo" element={<CheckInfo />} />
                <Route path="/changeInfo" element={<ChangeInfo />} />
                <Route path="/changePw" element={<ChangePw />} />
                <Route
                  path="/changePhoneNumber"
                  element={<ChangePhoneNumber />}
                />
                <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                <Route path="/social" element={<SocialLogin />} />
              </Route>
              <Route element={<Outlet />}>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/findAccount" element={<Find />} />
                <Route path="/findID" element={<FindId />}></Route>
                <Route path="/findIDResult" element={<FindIdResult />}></Route>
                <Route path="/findPW" element={<FindPassword />}></Route>
                <Route
                  path="/findPWResult"
                  element={<FindPasswordResult />}
                ></Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/loading" element={<SplashScreen />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/tos" element={<ToS />} />
                <Route
                  path="/privacyProcessAgreement"
                  element={<PrivacyProcessAgreement />}
                />
                <Route path="/historySearch" element={<HistorySearch />} />
              </Route>
            </Route>
          </Routes>
          {/* Toast 출력 */}
          {renderToast()}
        </Container>
      </ContainerWrapper>
    </BrowserRouter>
  );
}

export default App;
