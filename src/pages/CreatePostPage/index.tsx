import { ReactNode, useState } from 'react';

import { RegisterDataKey, RegisterData, StepType } from '@/types';

import CreateMainPage from '@/pages/CreatePostPage/CreateMainPage.tsx';
import SetDatePage from '@/pages/CreatePostPage/SetDatePage.tsx';
import SetPlacePage from '@/pages/CreatePostPage/SetPlacePage.tsx';
import SetPlaceMapPage from '@/pages/CreatePostPage/SetPlaceMapPage.tsx';
import SearchPage from '@/pages/SearchPage.tsx';
import { defaultLocation } from '@/utils/getCurrentlocation.ts';

const CreatePostPage = () => {
  const [step, setStep] = useState<StepType>('main');
  const [registerData, setRegisterData] =
    useState<RegisterData>(initialRegisterData);

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
      <Step check={step === 'main'}>
        <CreateMainPage
          registerData={registerData}
          setRegisterDataFunc={setRegisterDataFunc}
          setStep={setStep}
        />
      </Step>
      <Step check={step === 'time'}>
        <SetDatePage
          value={registerData.departureTime}
          setRegisterDataFunc={setRegisterDataFunc}
          comeBackMain={comeBackMain}
        />
      </Step>
      <Step check={step === 'origin' || step === 'destination'}>
        <SetPlacePage
          step={step}
          setStep={setStep}
          setRegisterDataFunc={setRegisterDataFunc}
          comeBackMain={comeBackMain}
        />
      </Step>
      <Step check={step === 'searchOrigin' || step === 'searchDestination'}>
        <SearchPage
          step={step}
          setStep={setStep}
          setRegisterDataFunc={setRegisterDataFunc}
        />
      </Step>
      <Step check={step === 'originMap' || step === 'destinationMap'}>
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
        />
      </Step>
    </>
  );
};

export default CreatePostPage;

const Step = ({ check, children }: { check: boolean; children: ReactNode }) => {
  if (check) {
    return children;
  }

  return null;
};

const { lat: latitude, lng: longitude } = await defaultLocation();

// 상태 초기화 유틸리티 함수
const initialRegisterData: RegisterData = (() => {
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
})();
