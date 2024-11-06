import { Client } from '@stomp/stompjs';
import { getAccessToken } from '@/api/baseApi.ts';

const checkReceive = (
  client: Client | null,
  partyId: string,
  chatId: string
) => {
  if (!client?.connected) return;
  const accessToken = getAccessToken();

  client.publish({
    destination: '/app/received',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({
      partyId,
      chatId,
    }),
  });
};

export default checkReceive;
