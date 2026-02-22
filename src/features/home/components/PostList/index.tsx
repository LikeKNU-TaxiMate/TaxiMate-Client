import { useRef } from 'react';
import 'react-spring-bottom-sheet/dist/style.css';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';

import formatDate from '@/utils/date/formatDate';

import {
  PostListContainer,
  ActivePostListContainer,
} from './PostList.style.ts';
import PostListItem from '@/components/common/PostListItem';
import { Party } from '@/types/party.ts';
import NoData from '@/components/common/NoData.tsx';

const PostList = ({
  isActivePostItem,
  data,
  setPostListHeight,
}: {
  isActivePostItem: string | null;
  data: Party[];
  setPostListHeight: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const sheetRef = useRef<BottomSheetRef | null>(null);

  if (isActivePostItem) {
    const targetData = data.filter((item) => item.id === isActivePostItem)[0];

    return (
      <ActivePostListContainer>
        <PostListItem
          id={targetData.id}
          title={targetData.title}
          currentParticipants={targetData.currentParticipants}
          maxParticipants={targetData.maxParticipants}
          departureTime={formatDate(targetData.departureTime)}
          origin={targetData.origin}
          destination={targetData.destination}
          activePostList
        />
      </ActivePostListContainer>
    );
  }

  return (
    <BottomSheet
      open
      blocking={false}
      ref={sheetRef}
      defaultSnap={({ maxHeight }) => Math.floor(maxHeight * 0.2)}
      snapPoints={({ maxHeight }) => [
        Math.floor(maxHeight * 0.9),
        Math.floor(maxHeight * 0.2),
      ]}
      expandOnContentDrag
      onSpringEnd={() => setPostListHeight(sheetRef.current?.height || 0)}
    >
      {data.length > 0 ? (
        <PostListContainer>
          {data.map((post) => (
            <PostListItem
              key={post.id}
              id={post.id}
              title={post.title}
              currentParticipants={post.currentParticipants}
              maxParticipants={post.maxParticipants}
              departureTime={formatDate(post.departureTime)}
              origin={post.origin}
              destination={post.destination}
            />
          ))}
        </PostListContainer>
      ) : (
        <NoData>주위 검색된 팟이 없습니다</NoData>
      )}
    </BottomSheet>
  );
};

export default PostList;
