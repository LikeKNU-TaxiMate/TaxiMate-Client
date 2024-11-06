import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import SockJS from 'sockjs-client';

import { getAccessToken } from '@/api/baseApi.ts';
import { eventBus } from '@/utils/eventBus.ts';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const uuid = uuidv4().replace('-', '');

export const useStompClient = (): Client | null => {
  const clientRef = useRef<Client | null>(null);
  const isLogin = useSelector((state: RootState) => state.userSlice.isLogin);
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!isLogin) {
      console.log('Access token is missing, STOMP connection skipped.');
      return;
    }

    const client = new Client({
      webSocketFactory: () => new SockJS(API_BASE_URL + '/ws'),
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      reconnectDelay: 1000,
      onConnect: () => {
        console.log('Connected to STOMP');
        client.subscribe(
          '/queue/messages/' + uuid,
          (message) => {
            const receivedMessage = JSON.parse(message.body);
            eventBus.publish('newMessage', receivedMessage);
          },
          { Authorization: `Bearer ${accessToken}` }
        );
      },
      onStompError: (frame) => {
        console.error(frame);
      },
      onDisconnect: () => {
        console.log('Disconnected');
      },
    });

    client.activate();

    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [isLogin]);

  return clientRef.current;
};

export default useStompClient;
