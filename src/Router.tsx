import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  DefaultProps,
  DefaultPropsProvider,
  Suspense,
} from '@suspensive/react';

import { CLIENT_PATH } from '@/constants/path.ts';
import useStompClient from '@/hooks/useStompClient.ts';
import AuthChecker from '@/AuthChecker.tsx';
import Layout from '@/components/common/Layout';
import LoadingIcon from '@/components/common/LoadingIcon';
import InAppNotificationLayout from '@/components/common/InAppNotification/InAppNotificationLayout.tsx';
import ForwardHandler from '@/ForwardHandler.tsx';
import { StompContext } from '@/store/StompContext.ts';

const HomePage = lazy(() => import('@/pages/Home'));
const ChatListPage = lazy(() => import('@/pages/ChatRoomList'));
const ChatRoomPage = lazy(() => import('@/pages/ChatRoom'));
const LoginPage = lazy(() => import('@/pages/Login'));
const LoginLoadingPage = lazy(
  () => import('@/pages/Login/LoginLoadingPage.tsx')
);
const SearchPage = lazy(() => import('@/pages/Search'));
const CreatePostPage = lazy(() => import('@/pages/CreatePost'));
const MyProfilePage = lazy(() => import('@/pages/MyProfile'));
const PostDetailPage = lazy(() => import('@/pages/PostDetail'));
const UsageHistoryPage = lazy(() => import('@/pages/UsageHistory'));

const defaultProps = new DefaultProps({
  Delay: {
    fallback: <LoadingIcon />,
    ms: 6000,
  },
  Suspense: {
    fallback: <LoadingIcon />,
    clientOnly: false,
  },
});

const Router = () => {
  const client = useStompClient();

  return (
    <BrowserRouter>
      <ForwardHandler />
      <DefaultPropsProvider defaultProps={defaultProps}>
        <Suspense>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<InAppNotificationLayout />}>
                <Route path={'/'} element={<HomePage />} />
                <Route path={CLIENT_PATH.SEARCH} element={<SearchPage />} />
                <Route
                  path={CLIENT_PATH.POST_DETAIL}
                  element={<PostDetailPage />}
                />
                <Route path={CLIENT_PATH.LOGIN} element={<LoginPage />} />
                <Route
                  path={CLIENT_PATH.LOGIN_LOADING}
                  element={<LoginLoadingPage />}
                />
                {/*유저 로그인 상태 체크 필요 페이지*/}
                <Route element={<AuthChecker />}>
                  <Route
                    path={CLIENT_PATH.MY_PROFILE}
                    element={<MyProfilePage />}
                  />
                  <Route
                    path={CLIENT_PATH.USAGE_HISTORY}
                    element={<UsageHistoryPage />}
                  />
                  <Route
                    path={CLIENT_PATH.CREATE_POST}
                    element={<CreatePostPage />}
                  />
                  <Route
                    path={CLIENT_PATH.CHAT_LISTS}
                    element={<ChatListPage />}
                  />
                </Route>
              </Route>
              <Route element={<AuthChecker />}>
                <Route
                  path={CLIENT_PATH.CHAT_ROOM}
                  element={
                    <StompContext.Provider value={client}>
                      <ChatRoomPage />
                    </StompContext.Provider>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </DefaultPropsProvider>
    </BrowserRouter>
  );
};

export default Router;
