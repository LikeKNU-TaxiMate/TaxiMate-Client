import { Party } from '@/types/party.ts';

interface Sender {
  id: string;
  nickname: string;
  profileImage: string;
}

type ChatType = 'MESSAGE' | 'SYSTEM';

// 메세지 수신
export interface WsChat {
  id: string;
  partyId: string;
  partyTitle: string;
  message: string;
  type: ChatType;
  createdAt: string;
  sender: Sender;
}

export interface ChatRoom {
  id: string;
  title: string;
  maxParticipants: number; // 최대 참여자 수
  currentParticipants: number; // 현재 참여자 수
  isProgress: boolean;
  recentMessage: string;
  recentMessageTime: string;
  unreadCount: number;
}

export interface ApiChat {
  id: string;
  partyId: string;
  message: string;
  type: ChatType;
  createdAt: string;
  sender: Sender | null;
}

export interface DetailChatRoom {
  party: Party;
  chats: ApiChat[];
}

export interface GroupMessage {
  chat: string[];
  createdAt: string;
  sender: Sender | null;
  type: ChatType;
}
