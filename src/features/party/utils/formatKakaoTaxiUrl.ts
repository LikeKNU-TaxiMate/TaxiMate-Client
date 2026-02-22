import { Place } from '../types/postDetail.types.ts';

export const formatKakaoTaxiUrl = (destination: Omit<Place, 'name'>) => {
  return `kakaot://taxi?dest_lat=${destination.lat}&dest_lng=${destination.lng}`;
};
