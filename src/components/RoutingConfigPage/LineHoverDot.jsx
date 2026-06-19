const VISIBLE_DOT_RADIUS = 3;
const HIT_AREA_RADIUS = 12;

/**
 * @param {{
 *   seriesKey: string;
 *   color: string;
 *   channelTitle: string;
 *   getCapacityPercent: (payload: object) => number;
 *   onPointHover: (point: object) => void;
 *   onPointLeave: () => void;
 *   onLineHover: (hover: { seriesKey: string; cx: number; cy: number; color: string }) => void;
 *   onLineLeave: (seriesKey: string) => void;
 *   lineHoverRef: React.RefObject<{ seriesKey: string; cx: number; cy: number; color: string } | null>;
 *   chartContainerRef: React.RefObject<HTMLElement | null>;
 * }} config
 */
export function createLineHoverDot({
  seriesKey,
  color,
  channelTitle,
  getCapacityPercent,
  onPointHover,
  onPointLeave,
  onLineHover,
  onLineLeave,
  lineHoverRef,
  chartContainerRef,
}) {
  return function LineHoverDot(props) {
    const { cx, cy, payload, value } = props;

    if (cx == null || cy == null || value == null || payload == null) {
      return null;
    }

    const lineHover = lineHoverRef.current;
    const isLineHovered =
      lineHover?.seriesKey === seriesKey && lineHover.cx === cx && lineHover.cy === cy;

    const handleMouseEnter = (event) => {
      event.stopPropagation();
      onLineHover({ seriesKey, cx, cy, color });

      const container = chartContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      onPointHover({
        left: event.clientX - containerRect.left,
        top: event.clientY - containerRect.top,
        time: payload.time,
        seriesName: seriesKey,
        channelTitle,
        tickets: value,
        capacityPercent: getCapacityPercent(payload),
      });
    };

    const handleMouseLeave = (event) => {
      event.stopPropagation();
      onLineLeave(seriesKey);
      onPointLeave();
    };

    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={HIT_AREA_RADIUS}
          fill="transparent"
          stroke="transparent"
          style={{ cursor: 'pointer' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {isLineHovered && (
          <circle
            cx={cx}
            cy={cy}
            r={VISIBLE_DOT_RADIUS}
            fill={color}
            stroke={color}
            pointerEvents="none"
          />
        )}
      </g>
    );
  };
}
