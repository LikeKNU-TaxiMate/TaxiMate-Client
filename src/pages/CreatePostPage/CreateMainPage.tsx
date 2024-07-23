import { useNavigate } from 'react-router-dom';
import { registerProps } from '@/types/props';

import Header from '@/components/common/Layout/Header';
import TitleWrap from '@/components/CreatePost/main/TitleWrap.tsx';
import DateWrap from '@/components/CreatePost/main/DateWrap.tsx';
import PlaceInfoWrap from '@/components/CreatePost/main/PlaceInfoWrap.tsx';
import MemberWrap from '@/components/CreatePost/main/MemberWrap.tsx';
import ExplanationWrap from '@/components/CreatePost/main/ExplanationWrap.tsx';
import {
  BackButton,
  HeaderItem,
} from '@/components/common/Layout/Header/Header.style.ts';
import {
  Container,
  CreateSubmitButton,
} from '@/components/CreatePost/createPost.style.ts';

import ArrowLeftIcon from '@/assets/icons/arrow-left-icon.svg?react';

const CreateMainPage = ({
  registerData,
  setRegisterDataFunc,
  setStep,
}: registerProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          <ArrowLeftIcon />
        </BackButton>
        <HeaderItem>팟 생성</HeaderItem>
        <CreateSubmitButton>만들기</CreateSubmitButton>
      </Header>
      <Container>
        <TitleWrap
          value={registerData.title}
          setRegisterDataFunc={setRegisterDataFunc}
        />
        <DateWrap value={registerData.departureTime} setStep={setStep} />
        <PlaceInfoWrap
          value={registerData.origin}
          value2={registerData.destination}
          setStep={setStep}
        />
        <MemberWrap
          value={registerData.maxParticipants}
          setRegisterDataFunc={setRegisterDataFunc}
        />
        <ExplanationWrap
          value={registerData.explanation}
          setRegisterDataFunc={setRegisterDataFunc}
        />
      </Container>
    </>
  );
};

export default CreateMainPage;
