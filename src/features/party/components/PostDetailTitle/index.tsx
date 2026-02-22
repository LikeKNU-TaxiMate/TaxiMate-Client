import formatDate from '@/utils/date/formatDate';
import { PostDetailTitleContainer } from './PostDetailTitle.style.ts';

const PostDetailTitle = ({
  title,
  departureTime,
}: {
  title: string;
  departureTime: string;
}) => {
  const reformatDate1 = formatDate(departureTime);
  return (
    <PostDetailTitleContainer>
      <h2>{title}</h2>
      {reformatDate1} 출발
    </PostDetailTitleContainer>
  );
};

export default PostDetailTitle;
