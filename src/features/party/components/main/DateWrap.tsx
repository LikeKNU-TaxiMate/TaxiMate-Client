import formatDate from '@/utils/date/formatDate';
import { ContentWrapProps } from '../../types/ContentWrapProps.ts';

import Index from '../ContentWrap';
import { DepartureTimeContainer } from './Wrap.style.ts';

import ClockIcon from '@/assets/icons/createPost/clock-icon.svg?react';
import ArrowRightIcon from '@/assets/icons/common/arrow-right-icon.svg?react';
import CalendarIcon from '@/assets/icons/createPost/calendar-icon.svg?react';

const DateWrap = ({ value, setStep }: ContentWrapProps) => {
  if (!setStep) return null;
  if (typeof value !== 'string') return null;

  return (
    <Index theme={'출발 시간'} SvgIcon={ClockIcon}>
      <DepartureTimeContainer
        onClick={() => {
          setStep('time');
        }}
      >
        <div>
          <CalendarIcon />
          {formatDate(value)}
        </div>
        <ArrowRightIcon />
      </DepartureTimeContainer>
    </Index>
  );
};

export default DateWrap;
