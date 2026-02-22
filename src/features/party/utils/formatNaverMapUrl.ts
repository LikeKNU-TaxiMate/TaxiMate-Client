import { Place } from '../types/postDetail.types.ts';

export const formatNaverMapUrl = ({
  origin,
  destination,
}: {
  origin: Place;
  destination: Place;
}) => {
  return `nmap://route/car?slat=${origin.lat}&slng=${origin.lng}&sname=${origin.name}&dlat=${destination.lat}&dlng=${destination.lng}&dname=${destination.name}&appname=com.example.myapp`;
};

export const getWebNaverMapUrl = (origin: Place, destination: Place): string =>
  `https://map.naver.com/p/directions/${origin.lng},${origin.lat},${origin.name},PLACE_POI/${destination.lng},${destination.lat},${destination.name},PLACE_POI/-/car?c=14.00,0,0,0,dh`;
