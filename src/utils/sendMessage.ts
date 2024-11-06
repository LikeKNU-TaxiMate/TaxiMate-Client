import { Client } from '@stomp/stompjs';
import { getAccessToken } from '@/api/baseApi.ts';

const sendMessage = (
  client: Client | null,
  partyId: string,
  message: string
) => {
  if (!client?.connected) return;

  const accessToken = getAccessToken();
  client.publish({
    destination: '/app/messages',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({
      partyId,
      message,
    }),
  });
};

export default sendMessage;
