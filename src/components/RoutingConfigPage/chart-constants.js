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
