import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGetAccessTokenQuery } from '@/api/userApi.ts';
import { setIsLogin } from '@/domains/MyProfile/Slice/userSlice.ts';
import useErrorHandle from '@/hooks/useErrorHandle.ts';
import useCustomNavigation from '@/hooks/useNavigate';

const LoginLoadingPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code') || '';
  const { goHome, goTo } = useCustomNavigation();

  const {
    isLoading: isTokenLoading,
    isSuccess: isTokenSuccess,
    isError: isTokenError,
    error: tokenError,
  } = useGetAccessTokenQuery({ code });

  useErrorHandle(tokenError);

  // 토큰이 성공적으로 받아졌을 때
  useEffect(() => {
    if (!isTokenLoading && isTokenSuccess) {
      dispatch(setIsLogin(true));
      // reactNativePostMessage('push_notification');
      goHome({ replace: true });
    } else if (isTokenError) {
      alert('로그인에 실패했습니다.');
      goTo({
        path: 'LOGIN',
        options: {
          replace: true,
        },
      });
    }
  }, [isTokenLoading, isTokenSuccess, isTokenError]);

  return null;
};

export default LoginLoadingPage;
