import { PostDetailStatus } from '@/types/post.ts';
import PeopleCountTag from '@/components/common/PeopleCountTag';
import {
  PostDetailHeaderContainer,
  ParticipationTag,
  CloseTag,
} from './PostDeailHeader.style.ts';

const PostDetailHeader = ({
  currentParticipants,
  maxParticipants,
  status,
  createdAt,
  views,
}: {
  currentParticipants: number;
  maxParticipants: number;
  status: PostDetailStatus;
  createdAt: string;
  views: string;
}) => {
  return (
    <PostDetailHeaderContainer>
      <div>
        <PeopleCountTag
          currentParticipants={currentParticipants}
          maxParticipants={maxParticipants}
        />
        {status === 'PARTICIPATING' && (
          <ParticipationTag>참여중인 팟</ParticipationTag>
        )}
        {status === 'TERMINATED' && <CloseTag>종료된 팟</CloseTag>}
      </div>
      {createdAt} • 조회 {views}
    </PostDetailHeaderContainer>
  );
};

export default PostDetailHeader;
