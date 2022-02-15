export const generateYears = (startPoint = 1976): string[] => {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];

  let startYear = startPoint - 1;

  while (startYear < currentYear) {
    years.push((startYear += 1).toString());
  }

  return years;
};
