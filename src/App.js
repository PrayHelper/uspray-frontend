import './App.css';
import {Reset} from 'styled-reset';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Outlet,
  useLocation,
  useParams,
  Navigate,
} from 'react-router-dom';
import styled from 'styled-components';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Main from './pages/Main';
import Group from './pages/Group';
import LoginPage from './components/Login/LoginPage';
import Settings from './pages/Settings';
import History from './pages/History';
import BottomNav from './components/BottomNav/BottomNav';
import CheckInfo from './pages/CheckInfo';
import ToS from './pages/ToS';
import PrivacyProcessAgreement from './pages/PrivacyProcessAgreement';
import Find from './pages/Find';
import FindId from './components/Find/FindId';
import FindIdResult from './components/Find/IdResult';
import FindPassword from './components/Find/FindPassword';
import FindPasswordResult from './components/Find/PwResult';
import PrivacyPolicy from './pages/PrivacyPolicy';
// import SocialLogin from './pages/SocialLogin';
import useAuthToken from './hooks/useAuthToken';
import useRefresh from './hooks/useRefresh';
import {useEffect} from 'react';
import SplashScreen from './pages/SplashScreen';
import useAuthorized from './hooks/useAuthorized';
import GlobalStyle from './styles/GlobalStyle';
import useToast from './hooks/useToast';
import HistorySearch from './pages/HistorySearch';
import GroupDetail from './components/Group/GroupDetail/GroupDetail';
import CreateGroup from './pages/CreateGroup';
import LeaveGroup from './pages/LeaveGroup';
import SocialLoginNameInput from './pages/SocialLoginNameInput';
import SocialRedirecting from './pages/SocialRedirecting';
import DeleteUser from './pages/DeleteUser';
import ChangeInfoSocial from './components/ChangeInfo/ChangeInfoSocial';
import AppleRedirecting from './pages/AppleRedirecting';
import TagManager from 'react-gtm-module';

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
  const {isUnauthorized} = useAuthorized();

  if (isUnauthorized()) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

const CommonRoute = () => {
  const {isUndefined} = useAuthorized();

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
  const {renderToast} = useToast({});

  useEffect(() => {
    TagManager.initialize({
      gtmId: `${process.env.REACT_APP_GTM_ID}`,
    });
  }, []);

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
                  <Route path="/group" element={<Group />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="/leaveGroup" element={<LeaveGroup />} />
                <Route path="/createGroup" element={<CreateGroup />} />
                <Route path="/checkInfo" element={<CheckInfo />} />
                <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                {/* <Route path="/social" element={<SocialLogin />} /> */}
                <Route
                  path="/changeInfoSocial"
                  element={<ChangeInfoSocial />}
                />
              </Route>
              <Route element={<Outlet />}>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/socialLoginNameInput"
                  element={<SocialLoginNameInput />}
                />
                <Route
                  path="/social-redirecting"
                  element={<SocialRedirecting />}
                />
                <Route
                  path="/apple-redirecting"
                  element={<AppleRedirecting />}
                />
                <Route path="/findAccount" element={<Find />} />
                <Route path="/findID" element={<FindId />}></Route>
                <Route path="/findIDResult" element={<FindIdResult />}></Route>
                <Route path="/findPW" element={<FindPassword />}></Route>
                <Route
                  path="/findPWResult"
                  element={<FindPasswordResult />}></Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/loading" element={<SplashScreen />} />
                <Route path="*" element={<NotFound />} />
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
