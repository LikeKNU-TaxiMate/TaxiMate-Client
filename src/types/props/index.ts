import { ReactNode } from 'react';
import { Client } from '@stomp/stompjs';
import {
  RegisterData,
  SetActiveMarker,
  SetRegisterDataFunc,
  SetStep,
  StepType,
} from '@/types';
import { Post } from '@/types/post.ts';
import { ChatMessage, GroupMessage } from '@/types/chat.ts';

export interface NavItemContainerProps {
  children: ReactNode;
  contentName?: string;
  path: string;
}

export interface PeopleCountTagProps {
  currentParticipants: number;
  maxParticipants: number;
  isClose?: boolean;
}

export interface PostHeaderProps extends PeopleCountTagProps {
  title: string;
  activePostList?: boolean;
}

export interface PostBodyProps {
  departureTime: string;
  origin: string;
  destination: string;
}

export interface PostListItemProps
  extends PostHeaderProps,
    PostBodyProps,
    PeopleCountTagProps {
  id: string;
}

export interface MoveCurrentLocationProps {
  map: naver.maps.Map | null;
  activeButton: boolean;
  setActiveButton: React.Dispatch<React.SetStateAction<boolean>>;
  activeMarker: string | null;
  postListHeight: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HomeMapProps {
  map: naver.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<naver.maps.Map | null>>;
  setActiveButton: React.Dispatch<React.SetStateAction<boolean>>;
  setShowResearchButton: React.Dispatch<React.SetStateAction<boolean>>;
  activeMarker: string | null;
  setActiveMarker: SetActiveMarker;
  data: Post[];
}

export interface MarkerContainerProps {
  id: string;
  position: {
    latitude: number;
    longitude: number;
  };
  title: string;
  anchor: number[];
  showPlace: boolean;
  activeMarker: string | null;
  setActiveMarker?: SetActiveMarker;
}

export interface CreateMainPageProps {
  registerData: RegisterData;
  createPostSubmit: () => void;
  setRegisterDataFunc: SetRegisterDataFunc;
  setStep: SetStep;
}

export interface ContentWrapProps {
  value: string | { longitude: number; latitude: number };
  setRegisterDataFunc?: SetRegisterDataFunc;
  setStep?: SetStep;
}

export interface SearchPageProps {
  step?: StepType;
  setStep?: SetStep;
  setRegisterDataFunc?: SetRegisterDataFunc;
}

export interface SetPlaceMapPageProps {
  step: StepType;
  value: { latitude: number; longitude: number };
  comeBackMain: () => void;
  setRegisterDataFunc: SetRegisterDataFunc;
  backHandle: () => void;
}

export interface SetDatePageProps {
  value: string;
  setRegisterDataFunc: SetRegisterDataFunc;
  comeBackMain: () => void;
}

export interface SetPlaceProps {
  step: StepType;
  setStep: SetStep;
  setRegisterDataFunc: SetRegisterDataFunc;
  comeBackMain: () => void;
}

export interface MessageListProps {
  client: Client | null;
  userId: string;
  currentPartyId: string;
  inAppNotificationHandler: (message: ChatMessage) => void;
  initialChatMessage: GroupMessage[];
  children: ReactNode;
}
