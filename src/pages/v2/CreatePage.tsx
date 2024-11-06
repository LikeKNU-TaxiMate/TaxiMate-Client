import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useErrorHandle from '@/hooks/useErrorHandle.ts';

import Header from '@/components/common/Layout/Header';
import TitleWrap from '@/components/v2/CreatePost/TitleWrap.tsx';
import MemberWrap from '@/components/v2/CreatePost/MemberWrap.tsx';
import { useCreatePostV2Mutation } from '@/api/v2/postApi.ts';
import { Container } from '@/components/v2/CreatePost/CreatePost.style.ts';
import {
  BackButton,
  HeaderItem,
} from '@/components/common/Layout/Header/Header.style.ts';
import { CreateSubmitButton } from '@/components/CreatePost/createPost.style.ts';

import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';

const CreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('4');
  const [createPost, { error }] = useCreatePostV2Mutation();
  useErrorHandle(error);

  const createPostSubmit = async () => {
    if (!title.trim()) {
      alert('제목을 입력해 주세요.');
      return;
    }

    await createPost({ title, maxParticipants }).unwrap();
    navigate('/');
  };

  return (
    <>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </BackButton>
        <HeaderItem>팟 생성</HeaderItem>
        <CreateSubmitButton onClick={createPostSubmit}>
          만들기
        </CreateSubmitButton>
      </Header>
      <Container>
        <TitleWrap value={title} setRegisterDataFunc={setTitle} />
        <MemberWrap
          value={maxParticipants}
          setRegisterDataFunc={setMaxParticipants}
        />
      </Container>
    </>
  );
};

export default CreatePage;
