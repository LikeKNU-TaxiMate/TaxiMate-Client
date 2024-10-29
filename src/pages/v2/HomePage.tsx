import Header from '@/components/common/Layout/Header';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';
import reactNativePostMessage from '@/utils/reactNavtivePostMessage.ts';

import TaxiIcon from '@/assets/icons/header/taxi-icon.svg?react';
import KnuLogoIcon from '@/assets/icons/header/knu-logo-icon.svg?react';
import Footer from '@/components/common/Layout/Footer';
import OthersMessageBox from '@/components/v2/Home/OtherMessageBox.tsx';
import { Main } from '@/components/v2/Home/Home.style.ts';
import MyMessageBox from '@/components/v2/Home/MyMessageBox.tsx';

const HomePage = () => {
  return (
    <>
      <Header>
        <HeaderItem>
          택시팟
          <TaxiIcon />
        </HeaderItem>
        <button
          onClick={() => {
            reactNativePostMessage('like_knu');
          }}
        >
          <KnuLogoIcon />
        </button>
      </Header>
      <Main>
        <OthersMessageBox
          messages={'1시 30분 쯤 학교에서 역 가실 분~'}
          name={'이준석'}
          img={''}
          time={'2024-08-05T00:04:21'}
          status={'NONE'}
        />
        <OthersMessageBox
          messages={
            '1시 30분 쯤 학교에서 역 가실 분~1시 30분 쯤 학교에서 역 가실 분~'
          }
          name={'이준석'}
          img={''}
          time={'2024-08-05T00:04:21'}
          status={'PARTICIPATING'}
        />
        <OthersMessageBox
          messages={
            "1시 30분 쯤 학교에서 역 가실 분~1시 30분 쯤 학교에서 역 가실 분~ 1시 30분 쯤 학교에서 역 가실 분~1시 30분 쯤 학교에서 역 가실 분~'"
          }
          name={'이준석'}
          img={''}
          time={'2024-08-05T00:04:21'}
          status={'PARTICIPATING'}
        />
        <MyMessageBox
          messages={
            "1시 30분 쯤 학교에서 역 가실 분~1시 30분 쯤 학교에서 역 가실 분~ 1시 30분 쯤 학교에서 역 가실 분~1시 30분 쯤 학교에서 역 가실 분~'"
          }
          time={'2024-08-05T00:04:21'}
          status={'PARTICIPATING'}
        />
      </Main>
      <Footer />
    </>
  );
};

export default HomePage;