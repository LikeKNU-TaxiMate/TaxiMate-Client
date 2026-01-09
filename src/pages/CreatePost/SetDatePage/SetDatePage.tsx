import { useState } from 'react';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { SetRegisterDataFunc } from '@/types';

import formatDate from '@/utils/date/formatDate';
import CreatePostChildPageLayout from '@/domains/CreatePost/components/CreatePostChildPageLayout';
import DatePickerWrap from '@/domains/CreatePost/components/setDate/DatePickerWrap.tsx';
import TimePickerWrap from '@/domains/CreatePost/components/setDate/TimePickerWrap.tsx';
import checkDate from '@/domains/CreatePost/utils/checkDate.ts';
import setDepartureTimeValueFunc from '@/domains/CreatePost/utils/setDepartureTimeValueFunc.ts';
import { Container, DateStringContainer } from './setDate.style.ts';
import { SubmitButton } from '@/domains/CreatePost/components/SubmitButton.tsx';

interface SetDatePageProps {
  value: string;
  setRegisterDataFunc: SetRegisterDataFunc;
  comeBackMain: () => void;
}

export const SetDatePage = ({
  value,
  setRegisterDataFunc,
  comeBackMain,
}: SetDatePageProps) => {
  const dateDepartureTimeValue = new Date(value);

  const [date, setDate] = useState(
    parseAbsoluteToLocal(dateDepartureTimeValue.toISOString())
  );

  const [time, setTime] = useState(() => ({
    meridiem: dateDepartureTimeValue.getHours() < 12 ? 'AM' : 'PM',
    hour: (dateDepartureTimeValue.getHours() % 12 || 12).toString(),
    minute: (Math.ceil(dateDepartureTimeValue.getMinutes() / 5) * 5).toString(),
  }));

  const newDate = setDepartureTimeValueFunc(
    date.toString(),
    time
  ).toISOString();

  const submitTimeFunc = () => {
    if (checkDate(newDate)) {
      setRegisterDataFunc('departureTime', newDate);
      comeBackMain();
    }
  };

  return (
    <CreatePostChildPageLayout
      subTitle={'언제 출발하나요?'}
      backHandle={comeBackMain}
    >
      <Container>
        <DateStringContainer>{formatDate(newDate)}</DateStringContainer>
        <DatePickerWrap date={date} setDate={setDate} />
        <TimePickerWrap time={time} setTime={setTime} />
        <SubmitButton onClick={submitTimeFunc}>완료</SubmitButton>
      </Container>
    </CreatePostChildPageLayout>
  );
};
