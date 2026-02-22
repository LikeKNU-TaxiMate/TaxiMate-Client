import NextRadio from '../Radio.tsx';
import Index from '../ContentWrap';
import MemberIcon from '@/assets/icons/createPost/member-icon.svg?react';
import { ContentWrapProps } from '../../types/ContentWrapProps.ts';

const MemberWrap = ({ value, setRegisterDataFunc }: ContentWrapProps) => {
  if (!setRegisterDataFunc) return null;
  if (typeof value !== 'string') return null;

  const setMemberValue = (e: string) => {
    setRegisterDataFunc('maxParticipants', e);
  };

  return (
    <Index theme={'탑승인원'} SvgIcon={MemberIcon}>
      <NextRadio value={value} setMemberValue={setMemberValue} />
    </Index>
  );
};

export default MemberWrap;
