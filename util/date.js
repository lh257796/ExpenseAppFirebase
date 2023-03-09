export const getFormattedDate = (date) => {
  return date.toISOString().slice(0, 10);
};
//date specific utility functions

export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
