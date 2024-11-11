import Header from '@/components/common/Layout/Header';
import Footer from '@/components/common/Layout/Footer';
import UserContainer from '@/components/common/UserContainer';
import {
  Container,
  Menu,
  // Bold,
  // EventExplain,
  // ContentTitle,
  // SubmitButton,
} from '@/components/MyProfile/myProfile.style.ts';
import { HeaderItem } from '@/components/common/Layout/Header/Header.style.ts';

import MyProfileIcon from '@/assets/icons/header/my-porfile-icon.svg?react';
import { useGetProfileQuery } from '@/api/userApi.ts';

// import MenuItem from '@/components/MyProfile/MenuItem.tsx';
// import FileIcon from '@/assets/icons/file-icon.svg?react';
// import NoticeIcon from '@/assets/icons/notice-icon.svg?react';
// import Toggle from '@/components/common/Toggle.tsx';

import LoadingIcon from '@/components/common/LoadingIcon';
import NoData from '@/components/common/NoData.tsx';

// import { useEffect, useState } from 'react';
// import {
//   CheckLength,
//   ContentContainer,
//   TitleInput,
// } from '@/components/CreatePost/createPost.style.ts';
// import { useEventMutation } from '@/api/v2/eventApi.ts';

const MyProfilePage = () => {
  const { data, isLoading } = useGetProfileQuery(null);
  // const [postEventTrigger, { isSuccess }] = useEventMutation();
  //
  // useEffect(() => {
  //   if (isSuccess) {
  //     alert('응모가 완료되었습니다! 🎉');
  //     localStorage.setItem('event', 'true');
  //   }
  // }, [isSuccess]);
  //
  // const [value, setValue] = useState('');
  if (isLoading) return <LoadingIcon />;
  if (!data) return <NoData>데이터를 찾을 수 없습니다</NoData>;
  const isEvent = localStorage.getItem('event');

  return (
    <>
      <Header>
        <HeaderItem>
          내 정보
          <MyProfileIcon />
        </HeaderItem>
      </Header>
      <Container>
        <UserContainer img={data.profileImage} name={data.nickname} />
        {!isEvent && (
          <Menu>
            {/*<MenuItem content={'알림설정'} SvgIcon={NoticeIcon}>*/}
            {/*  <Toggle />*/}
            {/*</MenuItem>*/}
            {/*<MenuItem content={'이용약관'} SvgIcon={FileIcon} />*/}
            {/*<ContentContainer>*/}
            {/*  <ContentTitle>*/}
            {/*    🎉 이벤트*/}
            {/*    <div>전화번호를 보내주시면 응모 완료!</div>*/}
            {/*  </ContentTitle>*/}
            {/*  <TitleInput*/}
            {/*    value={value}*/}
            {/*    onChange={(e) => {*/}
            {/*      setValue(e.target.value);*/}
            {/*    }}*/}
            {/*    placeholder={'- 없이 전화번호 입력'}*/}
            {/*    type={'number'}*/}
            {/*  />*/}
            {/*  <CheckLength>{value.length} / 11</CheckLength>*/}
            {/*  <EventExplain>*/}
            {/*    <br />*/}
            {/*    🎁 팟을 생성하거나 참여하면 {<Bold>치킨</Bold>} 🍗 쿠폰 추첨*/}
            {/*    기회까지!*/}
            {/*  </EventExplain>*/}
            {/*</ContentContainer>*/}
            {/*<SubmitButton*/}
            {/*  onClick={() => {*/}
            {/*    postEventTrigger(value);*/}
            {/*  }}*/}
            {/*>*/}
            {/*  응모하기*/}
            {/*</SubmitButton>*/}
          </Menu>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default MyProfilePage;
