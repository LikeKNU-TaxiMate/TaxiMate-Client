import { ReactNode, useState } from 'react';
import { defaultLocation } from '@/utils/location/getCurrentlocation.ts';
import { RegisterDataKey, RegisterData, StepType } from '@/types';

import { CreateMainPage } from './CreateMainPage';
import { SetDatePage } from './SetDatePage';
import { SetPlacePage } from './SetPlacePage';
import { SetPlaceMapPage } from './SetPlaceMapPage';
import { SearchPage } from './SearchPage';

// 출발지 초기 위치
const { lat: latitude, lng: longitude } = await defaultLocation();

const CreatePostPage = () => {
  const [step, setStep] = useState<StepType>('main');
  const [registerData, setRegisterData] = useState<RegisterData>(() => {
    const today = new Date();
    const ceilMinutes = Math.ceil(today.getMinutes() / 5) * 5;
    const departureTime = new Date(today.setMinutes(ceilMinutes)).toISOString();

    return {
      title: '',
      departureTime,
      explanation: '',
      originLocation: {
        latitude,
        longitude,
      },
      destinationLocation: {
        latitude: 36.8511811,
        longitude: 127.1511352,
      },
      maxParticipants: '4',
    };
  });

  // 출도착지 내 위치로 선택할 경우 지도에 현위치 마커 표시
  const [isMyLocationSelected, setIsMyLocationSelected] = useState(false);
  const comeBackMain = () => {
    setStep('main');
  };

  const setRegisterDataFunc = (
    name: RegisterDataKey,
    data: string | { longitude: number; latitude: number }
  ) => {
    setRegisterData((prev) => ({ ...prev, [name]: data }));
  };

  const setPlaceMapPageBackHandle = () => {
    setStep(step === 'originMap' ? 'origin' : 'destination');
  };

  return (
    <>
      <Step step={step} name={'main'}>
        <CreateMainPage
          registerData={registerData}
          setRegisterDataFunc={setRegisterDataFunc}
          setStep={setStep}
        />
      </Step>
      <Step step={step} name={'time'}>
        <SetDatePage
          value={registerData.departureTime}
          setRegisterDataFunc={setRegisterDataFunc}
          comeBackMain={comeBackMain}
        />
      </Step>
      <Step step={step} name={['origin', 'destination']}>
        <SetPlacePage
          step={step}
          setStep={setStep}
          setRegisterDataFunc={setRegisterDataFunc}
          comeBackMain={comeBackMain}
          setIsMyLocationSelected={setIsMyLocationSelected}
        />
      </Step>
      <Step step={step} name={['searchOrigin', 'searchDestination']}>
        <SearchPage
          step={step}
          setStep={setStep}
          setRegisterDataFunc={setRegisterDataFunc}
        />
      </Step>
      <Step step={step} name={['originMap', 'destinationMap']}>
        <SetPlaceMapPage
          step={step}
          value={
            step === 'originMap'
              ? registerData.originLocation
              : registerData.destinationLocation
          }
          setRegisterDataFunc={setRegisterDataFunc}
          comeBackMain={comeBackMain}
          backHandle={setPlaceMapPageBackHandle}
          isMyLocationSelected={isMyLocationSelected}
          setIsMyLocationSelected={setIsMyLocationSelected}
        />
      </Step>
    </>
  );
};

export { CreatePostPage };
export default CreatePostPage;

const Step = ({
  step,
  name,
  children,
}: {
  step: StepType;
  name: StepType | StepType[];
  children: ReactNode;
}) => {
  const names = Array.isArray(name) ? name : [name];
  return names.includes(step) ? children : null;
};
