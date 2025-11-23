export const formatAverageReviewTime = (timeInSeconds: number): string => {
  if (timeInSeconds <= 0) {
    return "—";
  }
  const minutes = (timeInSeconds / 60).toFixed(1);
  return minutes;
};
