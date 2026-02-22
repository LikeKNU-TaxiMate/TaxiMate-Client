import Header from '@/components/common/Layout/Header';
import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';
import { Container, SubTitle } from './Layout.style.ts';
import { ReactNode } from 'react';

interface Props {
  subTitle?: string;
  children: ReactNode;
  backHandle: () => void;
}

const CreatePostChildPageLayout = ({
  subTitle,
  children,
  backHandle,
}: Props) => {
  return (
    <>
      <Header>
        <button onClick={backHandle}>
          <ArrowLeftIcon />
        </button>
      </Header>
      <Container $subTitle={subTitle}>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
        {children}
      </Container>
    </>
  );
};

export default CreatePostChildPageLayout;
