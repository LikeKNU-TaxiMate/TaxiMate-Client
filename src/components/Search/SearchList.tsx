import { useEffect } from 'react';
import useSearchData from '@/hooks/useSearchData.ts';
import { SearchListContainer } from '@/components/Search/Search.style.ts';
import SearchListItem from '@/components/Search/SearchListItem.tsx';

const SearchList = ({
  value,
  listClickHandler,
}: {
  value: string;
  listClickHandler: (lat: number, lng: number) => void;
}) => {
  const { searchListsData, searchFunc } = useSearchData();
  useEffect(() => {
    if (value.length > 0) {
      searchFunc(value);
    }
  }, [value]);

  return (
    <SearchListContainer>
      {value &&
        searchListsData.map((item) => (
          <SearchListItem
            key={item.id}
            inputValue={value}
            title={item.title}
            address={item.roadAddress || item.jibunAddress}
            clickHandler={() => {
              listClickHandler(Number(item.y), Number(item.x));
            }}
          />
        ))}
    </SearchListContainer>
  );
};

export default SearchList;