import Header from '@/components/common/Layout/Header';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';
import Footer from '@/components/common/Layout/Footer';

import UsageHistoryIcon from '@/assets/icons/header/usage-history-icon.svg?react';

import UsageHistoryContainer from './UsageHistoryContainer.tsx';

const UsageHistoryPage = () => {
  return (
    <>
      <Header>
        <HeaderItem>
          이용내역
          <UsageHistoryIcon />
        </HeaderItem>
      </Header>
      <UsageHistoryContainer />
      <Footer />
    </>
  );
};

export default UsageHistoryPage;
