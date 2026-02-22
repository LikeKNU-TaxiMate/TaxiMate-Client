import SearchIcon from '@/assets/icons/map/search-icon.svg?react';
import { SearchBarWrapper, SearchBarContainer } from './SearchBar.style.ts';

const Index = ({ setStepFunc }: { setStepFunc: () => void }) => {
  return (
    <SearchBarWrapper onClick={setStepFunc}>
      <SearchIcon />
      <SearchBarContainer>장소 또는 주소를 검색하세요</SearchBarContainer>
    </SearchBarWrapper>
  );
};

export default Index;
