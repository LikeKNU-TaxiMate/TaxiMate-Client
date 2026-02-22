// 시간 데이터 타입 정의
interface TimeData {
  meridiem: string;
  hour: string;
  minute: string;
}

export default function setDepartureTimeValueFunc(
  dateString: string,
  timeData: TimeData
): Date {
  // 타임존 식별자 제거 (예: [Asia/Seoul])
  const cleanedDateString = dateString.replace(/\[.*\]$/, '');

  // 주어진 날짜 문자열을 Date 객체로 변환
  const date = new Date(cleanedDateString);

  // 시간 데이터에서 시, 분, 오전/오후 값을 추출
  const { meridiem, hour, minute } = timeData;

  // 문자열을 숫자로 변환
  let hourNum = parseInt(hour, 10);
  const minuteNum = parseInt(minute, 10);

  // 오전/오후에 따라 시간 조정
  if (meridiem === 'PM' && hourNum !== 12) {
    hourNum += 12;
  } else if (meridiem === 'AM' && hourNum === 12) {
    hourNum = 0;
  }

  // Date 객체의 시간 설정
  date.setHours(hourNum);
  date.setMinutes(minuteNum);
  date.setSeconds(0); // 필요에 따라 초를 0으로 설정
  date.setMilliseconds(0); // 필요에 따라 밀리초를 0으로 설정

  // 결과 확인
  return date;
}
