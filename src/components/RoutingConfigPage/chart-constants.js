/** Fixed pixel distance between adjacent x-axis tick marks on the capacity graph. */
export const X_AXIS_DISTANCE = 48;

/** Left gutter padding for the graph container. */
export const CHART_LEFT_GUTTER = 48;

export const CHART_HEIGHT = 360;

export const Y_AXIS_LABEL_WIDTH = 28;

/** Width reserved for y-axis tick numbers beside the plot. */
export const Y_AXIS_TICK_AREA_WIDTH = 36;

/** Vertical space reserved for x-axis tick labels below the plot area. */
export const X_AXIS_BAND_HEIGHT = 28;

export const CHART_Y_MARGIN = {
  top: 8,
  right: 0,
  bottom: 8,
  left: 0,
};

export const CHART_PLOT_MARGIN = {
  top: 8,
  right: 16,
  bottom: 8,
  left: 8,
};

export const getPlotInnerHeight = () =>
  CHART_HEIGHT -
  CHART_PLOT_MARGIN.top -
  CHART_PLOT_MARGIN.bottom -
  X_AXIS_BAND_HEIGHT;

export const getYAxisColumnWidth = () => Y_AXIS_LABEL_WIDTH + Y_AXIS_TICK_AREA_WIDTH;

export const getChartLeftFixedWidth = () => CHART_LEFT_GUTTER + getYAxisColumnWidth();

export const getYAxisTickTop = (tick, maxAxisValue) => {
  const innerHeight = getPlotInnerHeight();
  const ratio = maxAxisValue === 0 ? 0 : tick / maxAxisValue;
  return CHART_PLOT_MARGIN.top + (1 - ratio) * innerHeight;
};

const getNiceStep = (rawStep) => {
  const safeStep = Math.max(rawStep, 1);
  const magnitude = 10 ** Math.floor(Math.log10(safeStep));
  const normalized = safeStep / magnitude;

  if (normalized <= 1) return magnitude;
  if (normalized <= 2) return 2 * magnitude;
  if (normalized <= 5) return 5 * magnitude;
  return 10 * magnitude;
};

/** Y-axis label ticks — dense for small ranges, spaced for larger capacity values. */
export const getYAxisDisplayTicks = (maxValue) => {
  const max = Math.max(maxValue, 1);

  if (max <= 10) {
    return Array.from({ length: max + 1 }, (_, index) => index);
  }

  const targetTickCount = 6;
  const step = getNiceStep(max / (targetTickCount - 1));
  const ticks = [];

  for (let value = 0; value < max; value += step) {
    ticks.push(Math.round(value));
  }

  ticks.push(max);

  return [...new Set(ticks)].sort((a, b) => a - b);
};
