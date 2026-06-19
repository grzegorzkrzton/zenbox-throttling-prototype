/** Fixed pixel distance between adjacent x-axis tick marks on the capacity graph. */
export const X_AXIS_DISTANCE = 48;

/** Minimum pixel distance between adjacent y-axis grid lines. */
export const Y_AXIS_DISTANCE = 24;

/** Left gutter padding for the graph container. */
export const CHART_LEFT_GUTTER = 48;

/** Visible chart viewport height before vertical scrolling is required. */
export const CHART_VIEWPORT_HEIGHT = 360;

export const Y_AXIS_LABEL_WIDTH = 28;

/** Width reserved for y-axis tick numbers beside the plot. */
export const Y_AXIS_TICK_AREA_WIDTH = 36;

/** Vertical space reserved for x-axis tick labels below the plot area. */
export const X_AXIS_BAND_HEIGHT = 28;

export const CHART_PLOT_MARGIN = {
  top: 8,
  right: 16,
  bottom: 8,
  left: 8,
};

export const getPlotInnerHeight = (maxAxisValue) =>
  Math.max(maxAxisValue, 1) * Y_AXIS_DISTANCE;

export const getPlotHeight = (maxAxisValue) =>
  CHART_PLOT_MARGIN.top +
  getPlotInnerHeight(maxAxisValue) +
  CHART_PLOT_MARGIN.bottom +
  X_AXIS_BAND_HEIGHT;

export const getPlotWidth = (maxTimeValue) => {
  const tickSpan = Math.max(maxTimeValue, 1);
  return (
    tickSpan * X_AXIS_DISTANCE + CHART_PLOT_MARGIN.left + CHART_PLOT_MARGIN.right
  );
};

export const getYAxisColumnWidth = () => Y_AXIS_LABEL_WIDTH + Y_AXIS_TICK_AREA_WIDTH;

export const getYAxisTickTop = (tick, maxAxisValue) => {
  const innerHeight = getPlotInnerHeight(maxAxisValue);
  const ratio = maxAxisValue === 0 ? 0 : tick / maxAxisValue;
  return CHART_PLOT_MARGIN.top + (1 - ratio) * innerHeight;
};
