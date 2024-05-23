import styled from 'styled-components';
import useAuthToken from '../hooks/useAuthToken';
import useRefresh from '../hooks/useRefresh';
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import useAuthorized from '../hooks/useAuthorized';

import LogoSVG from '../images/logo_white.svg';

const SplashScreen = ({url}) => {
  const {getRefreshToken} = useAuthToken();
  const {refresh} = useRefresh();
  const {setAutorized, setUnAuthorized} = useAuthorized();
  const navigate = useNavigate();

  console.log(`splash screen url: ${url}`);
  useEffect(() => {
    const run = async () => {
      const refreshToken = await getRefreshToken();
      if (refreshToken === undefined || refreshToken === '') {
        console.log('refresh token is empty');
        setUnAuthorized();
        navigate(url);
        return;
      }

      try {
        await refresh();
        setAutorized();
        console.log('success to refresh token');
      } catch (e) {
        setUnAuthorized();
        console.log('fail to refresh token');
      }

      if (url === '/') {
        navigate('/main');
      } else {
        navigate(url);
      }
    };

    run();
  }, []);

  return (
    <BackgroundStyle>
      <img src={LogoSVG} alt="logo_white" />
    </BackgroundStyle>
  );
};

const BackgroundStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 전체적인 배경색 조합 */
  background: linear-gradient(
      167.98deg,
      rgba(0, 163, 255, 0) 0%,
      rgba(0, 163, 255, 0.4) 100%
    ),
    linear-gradient(135deg, #d6ffcb 0.01%, #75bd62 100%);
`;

export default SplashScreen;
