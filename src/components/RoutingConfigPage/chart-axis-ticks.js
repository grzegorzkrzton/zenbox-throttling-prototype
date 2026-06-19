const TIME_TICK_STEPS = [1, 2, 5, 10, 15, 30, 60];

const getTimeNiceStep = (rawStep) =>
  TIME_TICK_STEPS.find((step) => step >= rawStep) ?? TIME_TICK_STEPS[TIME_TICK_STEPS.length - 1];

/** X-axis label ticks — every minute for short ramp-ups, spaced for longer durations. */
export const getXAxisDisplayTicks = (maxMinutes) => {
  const max = Math.max(maxMinutes, 1);

  if (max <= 15) {
    return Array.from({ length: max + 1 }, (_, index) => index);
  }

  const targetTickCount = 8;
  const step = getTimeNiceStep(max / (targetTickCount - 1));
  const ticks = [];

  for (let value = 0; value < max; value += step) {
    ticks.push(value);
  }

  ticks.push(max);

  return [...new Set(ticks)].sort((a, b) => a - b);
};
