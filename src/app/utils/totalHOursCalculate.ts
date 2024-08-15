export function totalHoursCalculate(startTime: string, endTime: string) {
  const start = Number(new Date(`1970-01-01T${startTime}`)) / (1000 * 60 * 60);
  const end = Number(new Date(`1970-01-01T${endTime}`)) / (1000 * 60 * 60);

  const totalHours = end - start;
  return totalHours;
}
