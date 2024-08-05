export interface Post {
  id: string;
  title: string;
  departureTime: string;
  origin: string;
  maxParticipants: number;
  currentParticipants: number;
  destination: string;
  originLocation: { latitude: number; longitude: number };
}

export interface PostDetail extends Post {
  explanation: string;
  originAddress: string;
  destinationAddress: string;
  destinationLocation: { latitude: number; longitude: number };
  status: string;
  createdAt: string;
  views: string;
  host: {
    id: string;
    nickname: string;
    profileImage: string;
    isMe: boolean;
  };
  taxi: {
    route: { latitude: number; longitude: number }[];
    fare: string;
    duration: string;
  };
}
