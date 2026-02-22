import { CheckLength, TitleInput } from './Wrap.style.ts';
import Index from '../ContentWrap';
import TitleIcon from '@/assets/icons/createPost/title-icon.svg?react';
import { ContentWrapProps } from '../../types/ContentWrapProps.ts';

const TitleWrap = ({ value, setRegisterDataFunc }: ContentWrapProps) => {
  if (!setRegisterDataFunc) return null;
  if (typeof value !== 'string') return null;

  const setTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterDataFunc('title', e.target.value);
  };

  return (
    <Index
      theme={'제목'}
      explain={'팟을 한 줄로 표현해주세요!'}
      SvgIcon={TitleIcon}
    >
      <TitleInput
        value={value}
        onChange={setTitleValue}
        placeholder={'오후 1시 반쯤 학교에서 역으로'}
        maxLength={30}
      />
      <CheckLength>{value.length} / 30</CheckLength>
    </Index>
  );
};

export default TitleWrap;
