/**
 * @param {{
 *   seriesName: string;
 *   ticketsLabel: string;
 *   getCapacityPercent: (payload: object) => number;
 *   onPointHover: (point: object) => void;
 *   onPointLeave: () => void;
 *   chartContainerRef: React.RefObject<HTMLElement | null>;
 * }} config
 */
export function createLineHoverDot({
  seriesName,
  ticketsLabel,
  getCapacityPercent,
  onPointHover,
  onPointLeave,
  chartContainerRef,
}) {
  return function LineHoverDot(props) {
    const { cx, cy, payload, value } = props;

    if (cx == null || cy == null || value == null || payload == null) {
      return null;
    }

    const handleMouseEnter = (event) => {
      event.stopPropagation();
      const container = chartContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      onPointHover({
        left: event.clientX - containerRect.left,
        top: event.clientY - containerRect.top,
        time: payload.time,
        seriesName,
        tickets: value,
        ticketsLabel,
        capacityPercent: getCapacityPercent(payload),
      });
    };

    const handleMouseLeave = (event) => {
      event.stopPropagation();
      onPointLeave();
    };

    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="transparent"
        stroke="transparent"
        style={{ cursor: 'pointer' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
  };
}
