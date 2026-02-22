import { useEffect, useRef, useState } from 'react';
import { getAddress } from '@/api/kakaoApi.ts';

import Map from '../components/setPlace/Map.tsx';
import LocationInfo from '@/components/common/LocationInfo';
import CreatePostChildPageLayout from '../components/CreatePostChildPageLayout';
import { PLACE_KEYWORDS } from '../constants/Place.ts';
import { SubmitButton } from '../components/SubmitButton.tsx';
import { SubmitContainer } from './SetPlaceMap.style.ts';
import { SetRegisterDataFunc, StepType } from '@/types';

interface SetPlaceMapPageProps {
  step: StepType;
  value: { latitude: number; longitude: number };
  comeBackMain: () => void;
  setRegisterDataFunc: SetRegisterDataFunc;
  backHandle: () => void;
  isMyLocationSelected: boolean;
  setIsMyLocationSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SetPlaceMapPage = ({
  step,
  value,
  comeBackMain,
  setRegisterDataFunc,
  backHandle,
  isMyLocationSelected,
  setIsMyLocationSelected,
}: SetPlaceMapPageProps) => {
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [address, setAddress] = useState('');
  const [place, setPlace] = useState('');
  const isMyLocationSelectedRef = useRef(isMyLocationSelected);

  const isOrigin = step === 'originMap';
  const { keyWord, content } = isOrigin
    ? PLACE_KEYWORDS.origin
    : PLACE_KEYWORDS.destination;

  const setAddressInfo = async (lng: number, lat: number) => {
    const result = await getAddress(lng, lat);

    const { road_address, address } = result;

    const place =
      road_address?.building_name ||
      `${address.region_3depth_name} ${address.main_address_no}` +
        (address.sub_address_no && `-${address.sub_address_no}`);

    const addressName = road_address?.address_name || address.address_name;

    setPlace(place);
    setAddress(addressName);
  };

  const submitFunc = () => {
    if (!map) return;
    // 현재 위치 참조
    const { x, y } = map.getCenter();

    const registerKey = isOrigin ? 'originLocation' : 'destinationLocation';
    setRegisterDataFunc(registerKey, { latitude: y, longitude: x });
    comeBackMain();
  };

  useEffect(() => {
    return setIsMyLocationSelected(false);
  }, []);

  useEffect(() => {
    setAddressInfo(value.longitude, value.latitude);
  }, []);

  return (
    <CreatePostChildPageLayout backHandle={backHandle}>
      <Map
        map={map}
        setMap={setMap}
        setAddressInfo={setAddressInfo}
        isOrigin={isOrigin}
        defaultCenter={{ lat: value.latitude, lng: value.longitude }}
        isMyLocationSelected={isMyLocationSelectedRef.current}
      />
      <SubmitContainer>
        <LocationInfo keyWord={keyWord} place={place} address={address} />
        <SubmitButton onClick={submitFunc}>{content}</SubmitButton>
      </SubmitContainer>
    </CreatePostChildPageLayout>
  );
};
