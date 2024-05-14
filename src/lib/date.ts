/**
 * Finds the startDate of a given week and the x days after that date
 * @param referenceDate A date to have as a reference
 * @param offsetDays total days to do a offset, default to 6 for sunday
 * @returns A list with the startDate as the first element and the endDate as second element
 */
export function getIntervalBetweenStartOfWeekAndTotalOffsetDays(
  referenceDate: Date,
  offsetDays: number = 6
) {
  referenceDate.setDate(referenceDate.getDate() - referenceDate.getDay());
  const startDate = new Date(referenceDate);
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);
  startDate.setMilliseconds(0);
  referenceDate.setDate(
    referenceDate.getDate() + (offsetDays > 0 ? offsetDays : 6)
  );
  const endDate = new Date(offsetDays);
  startDate.setHours(23);
  startDate.setMinutes(59);
  startDate.setSeconds(59);
  startDate.setMilliseconds(999);
  return [startDate, endDate];
}
