export const getDateThirtyDaysFromToday = (): string => {
  const today = new Date();
  const futureDate = new Date(today.setDate(today.getDate() + 30));

  const day = futureDate.getDate();
  const month = futureDate.toLocaleString("default", { month: "short" });
  const year = futureDate.getFullYear();

  return `${day} ${month} ${year}`;
};
