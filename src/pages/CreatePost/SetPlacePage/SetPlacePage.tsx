import { useState } from 'react';
import { SetRegisterDataFunc, SetStep, StepType } from '@/types';
import getCurrentLocation from '@/utils/location/getCurrentlocation.ts';

import SearchBar from '@/domains/CreatePost/components/setPlace/SearchBar';
import { MyLocationButton } from './SetPlace.style.ts';
import LoadingIcon from '@/components/common/LoadingIcon';
import CreatePostChildPageLayout from '@/domains/CreatePost/components/CreatePostChildPageLayout';
import ActiveMoveLocationIcon from '@/assets/icons/map/active-move-location-icon.svg?react';

interface SetPlaceProps {
  step: StepType;
  setStep: SetStep;
  setRegisterDataFunc: SetRegisterDataFunc;
  comeBackMain: () => void;
  setIsMyLocationSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SetPlacePage = ({
  step,
  setStep,
  setRegisterDataFunc,
  comeBackMain,
  setIsMyLocationSelected,
}: SetPlaceProps) => {
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

  const isOrigin = step === 'origin';
  const subTitle = (isOrigin ? '어디에서 출발' : '어디로 도착') + '하나요?';

  const setStepFunc = () => {
    setStep(isOrigin ? 'searchOrigin' : 'searchDestination');
  };

  const MyLocationButtonClickHandle = async () => {
    try {
      setIsLoading(true);
      const { lat, lng } = await getCurrentLocation();
      const registerKey = isOrigin ? 'originLocation' : 'destinationLocation';
      setRegisterDataFunc(registerKey, { latitude: lat, longitude: lng });
      setIsMyLocationSelected(true);
      isOrigin ? setStep('originMap') : setStep('destinationMap');
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
  };

  return (
    <CreatePostChildPageLayout subTitle={subTitle} backHandle={comeBackMain}>
      {isLoading && <LoadingIcon />}
      <SearchBar setStepFunc={setStepFunc} />
      <MyLocationButton onClick={MyLocationButtonClickHandle}>
        <ActiveMoveLocationIcon />내 위치
      </MyLocationButton>
    </CreatePostChildPageLayout>
  );
};
