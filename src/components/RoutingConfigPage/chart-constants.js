/** Fixed pixel distance between adjacent x-axis tick marks on the capacity graph. */
export const X_AXIS_DISTANCE = 48;

export const CHART_HEIGHT = 360;

export const CHART_Y_MARGIN = {
  top: 8,
  right: 0,
  bottom: 8,
  left: 16,
};

export const Y_AXIS_LABEL_WIDTH = 28;

/** Minimum width reserved for y-axis tick numbers beside the plot. */
export const Y_AXIS_TICK_MIN_WIDTH = 40;

export const getYAxisTickWidth = (maxAxisValue) => {
  const digitCount = String(Math.max(maxAxisValue, 1)).length;
  return Math.max(Y_AXIS_TICK_MIN_WIDTH, digitCount * 10 + 20);
};

export const getYAxisWidth = (maxAxisValue) =>
  CHART_Y_MARGIN.left + Y_AXIS_LABEL_WIDTH + getYAxisTickWidth(maxAxisValue);

export const CHART_PLOT_MARGIN = {
  top: 8,
  right: 16,
  bottom: 8,
  left: 0,
};
