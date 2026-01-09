import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { BackButton } from '@/components/common/Layout/Header/Header.style.ts';
import TaxiIcon from '@/assets/icons/login/taxi-icon.svg?react';
import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';

import { Header, IconWrap, LoginButton } from './page.style.ts';
import { getKakaoInga } from '@/domains/Login/api/getKakaoInga.ts';
import useCustomNavigation from '@/hooks/useNavigate';

const Index = () => {
  const { goHome } = useCustomNavigation();
  const isLogin = useSelector((state: RootState) => state.userSlice.isLogin);

  return (
    <>
      <Header>
        <BackButton onClick={() => goHome({ replace: true })}>
          <ArrowLeftIcon />
        </BackButton>
      </Header>
      <IconWrap>
        <TaxiIcon />
        <div>공주대학교</div>
        <span>택시팟</span>
        <LoginButton
          onClick={() => {
            if (isLogin) {
              goHome({ replace: true });
            } else {
              getKakaoInga();
            }
          }}
        >
          <img src={'/kakao-login.png'} alt={'kakao-login-button'} />
        </LoginButton>
      </IconWrap>
    </>
  );
};

export default Index;
