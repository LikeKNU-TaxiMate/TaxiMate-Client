import { useCreatePostMutation } from '@/api/postApi.ts';

import Header from '@/components/common/Layout/Header';
import LoadingIcon from '@/components/common/LoadingIcon';
import {
  BackButton,
  HeaderItem,
} from '@/components/common/Layout/Header/Header.style.ts';
import { RegisterData, SetRegisterDataFunc, SetStep } from '@/types';

import DateWrap from '@/domains/CreatePost/components/main/DateWrap.tsx';
import TitleWrap from '@/domains/CreatePost/components/main/TitleWrap.tsx';
import MemberWrap from '@/domains/CreatePost/components/main/MemberWrap.tsx';
import PlaceInfoWrap from '@/domains/CreatePost/components/main/PlaceInfoWrap.tsx';
import ExplanationWrap from '@/domains/CreatePost/components/main/ExplanationWrap.tsx';
import validateRegisterData from '@/domains/CreatePost/utils/validateRegisterData.ts';
import { Container, CreateSubmitButton } from './CreateMain.style.ts';

import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';
import useCustomNavigation from '@/hooks/useNavigate';

interface CreateMainPageProps {
  registerData: RegisterData;
  setRegisterDataFunc: SetRegisterDataFunc;
  setStep: SetStep;
}

export const CreateMainPage = ({
  registerData,
  setRegisterDataFunc,
  setStep,
}: CreateMainPageProps) => {
  const { goTo, goHome } = useCustomNavigation();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const createPostSubmit = async () => {
    if (!validateRegisterData(registerData) || isLoading) return;
    const formatDate = new Date(
      new Date(registerData.departureTime).getTime() + 1000 * 60 * 60 * 9
    ).toISOString();

    try {
      const result = await createPost({
        ...registerData,
        departureTime: formatDate,
      }).unwrap();
      goTo({
        path: 'POST_DETAIL',
        id: result.data.partyId,
        options: {
          replace: true,
        },
      });
    } catch (err) {
      console.error('Post creation failed:', err);
      alert('게시글 생성 중 문제가 발생했습니다.');
    }
  };

  return (
    <>
      <Header>
        <BackButton onClick={() => goHome({ replace: true })}>
          <ArrowLeftIcon />
        </BackButton>
        <HeaderItem>팟 생성</HeaderItem>
        <CreateSubmitButton onClick={createPostSubmit}>
          만들기
        </CreateSubmitButton>
      </Header>
      <Container>
        {isLoading && <LoadingIcon />}
        <TitleWrap
          value={registerData.title}
          setRegisterDataFunc={setRegisterDataFunc}
        />
        <DateWrap value={registerData.departureTime} setStep={setStep} />
        <PlaceInfoWrap
          value={registerData.originLocation}
          value2={registerData.destinationLocation}
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
