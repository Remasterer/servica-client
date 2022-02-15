import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const getLeftTime = (date: Date): string => {
  const endDate = dayjs(date);

  return dayjs().to(endDate, true);
};
