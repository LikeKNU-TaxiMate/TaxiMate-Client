import { useEffect, useState } from 'react';
import { getAddress } from '@/api/kakaoApi.ts';
import { ContentWrapProps } from '../../types/ContentWrapProps.ts';

import LocationInfo from '@/components/common/LocationInfo';
import Index from '../ContentWrap';
import LocationPinIcon from '@/assets/icons/createPost/location-pin-icon.svg?react';

interface PlaceInfoWrapProps extends ContentWrapProps {
  value2: { longitude: number; latitude: number };
}

const PlaceInfoWrap = ({ value, value2, setStep }: PlaceInfoWrapProps) => {
  const [originAddress, setOriginAddress] = useState({
    addressName: '',
    place: '',
  });
  const [destinationAddress, setDestinationAddress] = useState({
    addressName: '',
    place: '',
  });

  const setLocationInfo = async (
    longitude: number,
    latitude: number,
    target: React.Dispatch<
      React.SetStateAction<{ addressName: string; place: string }>
    >
  ) => {
    const result = await getAddress(longitude, latitude);

    const { road_address, address } = result;

    const place =
      road_address?.building_name ||
      `${address.region_3depth_name} ${address.main_address_no}` +
        (address.sub_address_no && `-${address.sub_address_no}`);

    const addressName = road_address?.address_name || address.address_name;

    target({
      place,
      addressName,
    });
  };

  useEffect(() => {
    if (typeof value !== 'string') {
      setLocationInfo(value.longitude, value.latitude, setOriginAddress);
      setLocationInfo(value2.longitude, value2.latitude, setDestinationAddress);
    }
  }, []);

  if (!setStep) return null;

  return (
    <Index theme={'출도착지'} SvgIcon={LocationPinIcon}>
      <button
        onClick={() => {
          setStep('origin');
        }}
      >
        <LocationInfo
          keyWord={'출발지'}
          place={originAddress.place}
          address={originAddress.addressName}
          inCreate
        />
      </button>
      <button
        onClick={() => {
          setStep('destination');
        }}
      >
        <LocationInfo
          keyWord={'도착지'}
          place={destinationAddress.place}
          address={destinationAddress.addressName}
          inCreate
        />
      </button>
    </Index>
  );
};

export default PlaceInfoWrap;
