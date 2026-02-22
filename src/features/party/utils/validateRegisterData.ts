import { RegisterData } from '@/types';
import checkDate from './checkDate.ts';
import isSameLocation from '@/utils/isSameLocation.ts';

const validateRegisterData = (registerData: RegisterData) => {
  const {
    title,
    explanation,
    originLocation,
    destinationLocation,
    departureTime,
  } = registerData;

  if (!validateField(!title.trim(), '제목을 입력해 주세요.')) return;
  if (!validateField(!explanation.trim(), '간단 설명을 입력해 주세요.')) return;
  if (
    !validateField(
      isSameLocation(originLocation, destinationLocation),
      '출발지와 도착지가 동일합니다.'
    )
  )
    return;
  if (!checkDate(departureTime)) return;

  return true;
};

export default validateRegisterData;

const validateField = (value: boolean, message: string) => {
  if (value) {
    alert(message);
    return false;
  }
  return true;
};
