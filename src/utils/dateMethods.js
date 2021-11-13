export const daysBetween = (date1, date2) => {
  // The number of milliseconds in one day
  console.log(`date1`, date1);
  console.log(`date2`, date2);
  const ONE_DAY = 1000 * 60 * 60 * 24;

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(date1 - date2);

  // Convert back to days and return
  return Math.round(differenceMs / ONE_DAY);
};
