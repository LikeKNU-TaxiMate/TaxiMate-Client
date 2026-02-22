import UserContainer from '@/components/common/UserContainer';
import { ParticipantsBoxContainer } from './ParticipantsBox.style.ts';
import { Participant } from '@/types/post.ts';

const ParticipantsBox = ({ participants }: { participants: Participant[] }) => {
  return (
    <ParticipantsBoxContainer>
      {[...participants] // 배열의 복사본을 생성
        .sort((a) => (a.role === 'HOST' ? -1 : 1)) // 'HOST'인 데이터를 앞으로 이동
        .map((item) => (
          <UserContainer
            key={item.id}
            img={item.profileImage}
            name={item.nickname}
            isHost={item.role === 'HOST'}
          />
        ))}
    </ParticipantsBoxContainer>
  );
};

export default ParticipantsBox;
