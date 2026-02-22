export interface Party {
  id: string;
  title: string;
  departureTime: string;
  origin: string;
  maxParticipants: number;
  currentParticipants: number;
  destination: string;
  originLocation: { latitude: number; longitude: number };
}

export type PartyDetailStatus =
  | 'NONE'
  | 'PARTICIPATING'
  | 'TERMINATED'
  | 'WARNED'
  | 'BANNED';

export interface Participant {
  id: string;
  nickname: string;
  profileImage: string;
  role: 'HOST' | 'PARTICIPANT';
}

export interface PartyDetail extends Party {
  explanation: string;
  originAddress: string;
  destinationAddress: string;
  destinationLocation: { latitude: number; longitude: number };
  status: PartyDetailStatus;
  createdAt: string;
  views: string;
  participants: Participant[];
  taxi: {
    route: { latitude: number; longitude: number }[];
    fare: string;
    duration: string;
  };
}

export interface CreatePartyRes {
  success: boolean;
  message: string;
  data: {
    partyId: string;
  };
}
