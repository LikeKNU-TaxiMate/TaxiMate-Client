import UserContainer from '@/components/common/UserContainer';
import { Container, Menu } from './page.style.ts';
import { Link } from 'react-router-dom';
import MenuItem from '@/domains/MyProfile/components/MenuItem.tsx';
import { useGetProfileQuery } from '@/api/userApi.ts';
import NoData from '@/components/common/NoData.tsx';
import FileIcon from '@/assets/icons/myprofile/file-icon.svg?react';
import SuspenseContainer from '@/components/common/SuspenseContainer.tsx';

const MyProfileContainer = () => {
  const { data, isLoading } = useGetProfileQuery(null);
  if (isLoading) return <SuspenseContainer />;
  if (!data) return <NoData>데이터를 찾을 수 없습니다</NoData>;

  return (
    <Container>
      <UserContainer img={data.profileImage} name={data.nickname} />
      <Menu>
        <Link
          to={
            'https://www.notion.so/woopaca/722d2e1180f94eeead36ec09436d4576?pvs=4'
          }
        >
          <MenuItem content={'이용약관'} SvgIcon={FileIcon} />
        </Link>
      </Menu>
    </Container>
  );
};

export default MyProfileContainer;
