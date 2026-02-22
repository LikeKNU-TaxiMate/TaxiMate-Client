import { DatePicker } from '@nextui-org/date-picker';
import { ZonedDateTime } from '@internationalized/date';
import { getLocalTimeZone, today } from '@internationalized/date';
import styled from 'styled-components';

const DatePickerWrap = ({
  date,
  setDate,
}: {
  date: ZonedDateTime;
  setDate: React.Dispatch<React.SetStateAction<ZonedDateTime>>;
}) => {
  const minDate = today(getLocalTimeZone());

  return (
    <DatePickerContainer>
      <DatePicker
        label='출발 날짜'
        isOpen
        granularity='day'
        labelPlacement={'outside'}
        value={date}
        onChange={setDate}
        classNames={{
          base: 'relative z-[111111] pb-[20px]',
        }}
        minValue={minDate}
        maxValue={minDate.add({ months: 1 })}
      />
    </DatePickerContainer>
  );
};

export default DatePickerWrap;

export const DatePickerContainer = styled.div`
  margin-bottom: 300px;
`;
