import { Outlet, useNavigate } from 'react-router-dom';
import Container from '@/components/common/Layout/Layout.style.ts';
import { useEffect } from 'react';
import { CLIENT_PATH } from '@/constants/path.ts';
import reactNativePostMessage from '@/utils/reactNativePostMessage.ts';
import { useSetPushAlarmMutation } from '@/api/userApi.ts';

const Layout = () => {
  const navigate = useNavigate();

  const [setPushAlarmTrigger] = useSetPushAlarmMutation();

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (
        e.origin === 'https://vercel.live' ||
        e.data.source === 'react-devtools-content-script' ||
        e.data.source === 'react-devtools-bridge'
      ) {
        return;
      }

      try {
        const { data, type } = JSON.parse(e.data);

        switch (type) {
          case 'CHAT':
            if (data.partyId) {
              navigate(
                CLIENT_PATH.CHAT_ROOM.replace(':chatRoomId', data.partyId)
              );
            }
            break;
          case 'PUSH_NOTIFICATION':
            if (data.token) {
              setPushAlarmTrigger(data.token);
            }
            break;
        }
      } catch (error) {
        console.error('메시지 처리 중 오류 발생:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    reactNativePostMessage('chat');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Layout;
