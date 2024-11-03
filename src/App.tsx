import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavermapsProvider } from 'react-naver-maps';
import { Analytics } from "@vercel/analytics/react"
//import { NextUIProvider } from '@nextui-org/system';
import Router from '@/Router.tsx';
import { useGetRefreshAccessTokenQuery } from '@/api/userApi.ts';
import { setIsLogin } from '@/components/MyProfile/userSlice.ts';
import GlobalStyle from '@/styles/GlobalStyle.ts';

const naverMapApi = import.meta.env.VITE_NAVER_MAP_API;
const kakaoJsKey = import.meta.env.VITE_KAKAO_JS_KEY;

declare global {
  interface Window {
    Kakao: any;
  }
}

window.Kakao.init(kakaoJsKey);

// SDK 초기화 여부를 판단합니다.
console.log(window.Kakao.isInitialized());
const splashDom = document.getElementById('splash');
splashDom?.remove();

function App() {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false); // 렌더링 준비 상태
  const { isSuccess, isLoading } = useGetRefreshAccessTokenQuery(null);

  useEffect(() => {
    // API 호출이 완료될 때까지 기다림
    if (!isLoading) {
      if (isSuccess) {
        dispatch(setIsLogin(true));
      }
      setIsReady(true); // 모든 작업이 완료되었음을 표시
    }
  }, [isSuccess, isLoading, dispatch]);

  if (!isReady) return null;

  return (
    <>
      <Analytics />
      <NavermapsProvider ncpClientId={naverMapApi}>
        {/*<NextUIProvider>*/}
        <GlobalStyle />
        <Router />
        {/*</NextUIProvider>*/}
      </NavermapsProvider>
    </>

  );
}

export default App;
