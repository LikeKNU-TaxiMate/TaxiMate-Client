import Header from '@/components/common/Layout/Header';
import Footer from '@/components/common/Layout/Footer';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';

import MyProfileIcon from '@/assets/icons/header/my-porfile-icon.svg?react';

import MyProfileContainer from './MyProfileContainer.tsx';

const Index = () => {
  return (
    <>
      <Header>
        <HeaderItem>
          내 정보
          <MyProfileIcon />
        </HeaderItem>
      </Header>
      <MyProfileContainer />
      <Footer />
    </>
  );
};

export default Index;
