const checkDate = (newDate: string): boolean => {
  const targetDate = new Date(newDate);
  const currentDate = new Date();
  const oneMonthLater = new Date();
  oneMonthLater.setMonth(currentDate.getMonth() + 1);
  oneMonthLater.setDate(currentDate.getDate() - 1);

  const isValid = currentDate <= targetDate && targetDate <= oneMonthLater;

  if (!isValid) {
    alert('올바르지 않은 시각입니다.');
  }

  return isValid;
};

export default checkDate;
