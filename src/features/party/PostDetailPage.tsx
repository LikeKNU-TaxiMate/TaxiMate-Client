import PostDetailContainer from './components/PostDetailContainer.tsx';
import Header from '@/components/common/Layout/Header';
import { BackButton } from '@/components/common/Layout/Header/Header.style.ts';
import ArrowLeftIcon from '@/assets/icons/common/arrow-left-icon.svg?react';
import useCustomNavigation from '@/hooks/useNavigate/useNavigate.ts';

export const PostDetailPage = () => {
  const { goHome } = useCustomNavigation();

  return (
    <>
      <Header>
        <BackButton onClick={() => goHome({ replace: true })}>
          <ArrowLeftIcon />
        </BackButton>
      </Header>
      <PostDetailContainer />
    </>
  );
};

export default PostDetailPage;
