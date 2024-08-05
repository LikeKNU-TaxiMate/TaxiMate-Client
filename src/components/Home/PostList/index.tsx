import { useRef } from 'react';
import 'react-spring-bottom-sheet/dist/style.css';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';

import reformatDate from '@/utils/reformatDate.ts';

import {
  PostListContainer,
  ActivePostListContainer,
} from '@/components/Home/PostList/PostList.style.ts';
import PostListItem from '@/components/common/PostListItem';
import { Post } from '@/types/post.ts';
import { Link } from 'react-router-dom';

const PostList = ({
  activeMarker,
  data,
  setPostListHeight,
}: {
  activeMarker: string | null;
  data: Post[];
  setPostListHeight: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const sheetRef = useRef<BottomSheetRef | null>(null);

  if (activeMarker) {
    const targetData = data.filter((item) => item.id === activeMarker)[0];

    return (
      <ActivePostListContainer>
        <Link to={'posts/' + targetData.id}>
          <PostListItem
            title={targetData.title}
            currentParticipants={targetData.currentParticipants}
            maxParticipants={targetData.maxParticipants}
            departureTime={reformatDate(targetData.departureTime)}
            origin={targetData.origin}
            destination={targetData.destination}
            activePostList
          />
        </Link>
      </ActivePostListContainer>
    );
  }

  return (
    <>
      <BottomSheet
        open
        blocking={false}
        ref={sheetRef}
        defaultSnap={() => 80}
        snapPoints={({ maxHeight }) => [
          Math.floor(maxHeight * 0.9),
          Math.floor(maxHeight * 0.4),
          80,
        ]}
        expandOnContentDrag
        onSpringEnd={() => setPostListHeight(sheetRef.current?.height || 0)}
      >
        <PostListContainer>
          {data.map((post) => (
            <PostListItem
              key={post.id}
              title={post.title}
              currentParticipants={post.currentParticipants}
              maxParticipants={post.maxParticipants}
              departureTime={reformatDate(post.departureTime)}
              origin={post.origin}
              destination={post.destination}
            />
          ))}
        </PostListContainer>
      </BottomSheet>
    </>
  );
};

export default PostList;
